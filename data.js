// EASE Data Management System - Shared across all pages

class EaseDataManager {
    constructor() {
        this.storagePrefix = 'EASE_';
    }

    // Initialize data
    initializeData() {
        if (!this.getData('bulkUsers')) {
            this.setData('bulkUsers', []);
        }
        if (!this.getData('orders')) {
            this.setData('orders', []);
        }
        if (!this.getData('contacts')) {
            this.setData('contacts', []);
        }
        
        // Always ensure admin user exists
        let adminUsers = this.getData('adminUsers');
        if (!adminUsers || adminUsers.length === 0) {
            const defaultAdmin = { 
                id: 1, 
                username: 'admin', 
                email: 'ease@gmail.com', 
                password: 'ease123', 
                role: 'admin', 
                fullName: 'EASE Admin' 
            };
            this.setData('adminUsers', [defaultAdmin]);
            console.log('✅ Admin user created:', defaultAdmin);
        } else {
            console.log('✅ Admin users found:', adminUsers);
        }
        
        if (!this.getData('currentBulkUser')) {
            this.setData('currentBulkUser', null);
        }
    }

    // Get data from localStorage
    getData(key) {
        const data = localStorage.getItem(this.storagePrefix + key);
        return data ? JSON.parse(data) : null;
    }

    // Set data in localStorage
    setData(key, value) {
        localStorage.setItem(this.storagePrefix + key, JSON.stringify(value));
    }

    // Register bulk order user
    registerBulkUser(email, fullName, phone, town, password, barangay, purok) {
        const users = this.getData('bulkUsers') || [];
        
        // Check if email already exists
        if (users.find(u => u.email === email)) {
            return { error: 'Email already registered' };
        }
        
        const newUser = {
            id: Date.now(),
            email: email,
            password: password,
            fullName: fullName,
            phone: phone,
            town: town,
            barangay: barangay || 'Not Specified',
            purok: purok || 'Not Specified',
            registeredDate: new Date().toLocaleDateString(),
            totalOrders: 0,
            totalPoints: 0,
            lastLogin: new Date().toLocaleString(),
            userAudit: [{
                action: 'User Registered',
                date: new Date().toLocaleString(),
                ip: 'Local',
                details: 'New bulk user registered from ' + (barangay || 'Not Specified') + ' - ' + (purok || 'Not Specified')
            }]
        };
        users.push(newUser);
        this.setData('bulkUsers', users);
        return newUser;
    }

    // Get bulk user by email
    getBulkUserByEmail(email) {
        const users = this.getData('bulkUsers') || [];
        return users.find(u => u.email === email);
    }

    // Add order (from regular customer or bulk user)
    addOrder(orderData) {
        const orders = this.getData('orders') || [];
        const newOrder = {
            id: 'ORD-' + Date.now(),
            ...orderData,
            status: 'pending',
            paymentStatus: 'pending',
            paymentMethod: orderData.paymentMethod || 'cash',
            orderDate: new Date().toLocaleString(),
            orderTime: new Date().getTime(),
            audit: [{
                action: 'Order Created',
                date: new Date().toLocaleString(),
                details: `Order submitted from ${orderData.type || 'retail'}`
            }]
        };
        orders.push(newOrder);
        this.setData('orders', orders);

        // Update bulk user if applicable
        if (orderData.userId) {
            const users = this.getData('bulkUsers') || [];
            const user = users.find(u => u.id === orderData.userId);
            if (user) {
                user.totalOrders += 1;
                user.totalPoints += orderData.points || 0;
                user.lastLogin = new Date().toLocaleString();
                if (!user.userAudit) user.userAudit = [];
                user.userAudit.push({
                    action: 'Order Placed',
                    date: new Date().toLocaleString(),
                    details: `Order #${newOrder.id} for ${orderData.quantity} items`
                });
                this.setData('bulkUsers', users);
            }
        }

        return newOrder;
    }

    // Get all orders
    getAllOrders() {
        return this.getData('orders') || [];
    }

    // Get orders by user
    getOrdersByUser(userId) {
        const orders = this.getData('orders') || [];
        return orders.filter(o => o.userId === userId);
    }

    // Update order status (admin only)
    updateOrderStatus(orderId, status, notes = '') {
        const orders = this.getData('orders') || [];
        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.status = status;
            if (!order.audit) order.audit = [];
            order.audit.push({
                action: 'Status Updated',
                date: new Date().toLocaleString(),
                details: `Status changed to: ${status} ${notes ? ' - ' + notes : ''}`
            });
            this.setData('orders', orders);
            return true;
        }
        return false;
    }

    // Update payment status
    updatePaymentStatus(orderId, paymentStatus) {
        const orders = this.getData('orders') || [];
        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.paymentStatus = paymentStatus;
            if (!order.audit) order.audit = [];
            order.audit.push({
                action: 'Payment Updated',
                date: new Date().toLocaleString(),
                details: `Payment status: ${paymentStatus}`
            });
            this.setData('orders', orders);
            return true;
        }
        return false;
    }

    // Get all bulk users
    getAllBulkUsers() {
        return this.getData('bulkUsers') || [];
    }

    // Get all bulk users (alias for compatibility)
    getBulkUsers() {
        return this.getAllBulkUsers();
    }

    // Get admin users
    getAdminUsers() {
        const admins = this.getData('adminUsers');
        console.log('Getting admin users:', admins);
        return admins || [];
    }

    // Verify admin login - accepts both username and email
    verifyAdminLogin(username, password) {
        console.log('Verifying login for:', username);
        const admins = this.getAdminUsers();
        console.log('All admin users:', admins);
        
        const admin = admins.find(a => {
            const usernameMatch = a.username === username;
            const emailMatch = a.email === username;
            const passwordMatch = a.password === password;
            
            console.log(`Checking admin: username="${a.username}" vs "${username}" (${usernameMatch}), email="${a.email}" vs "${username}" (${emailMatch}), password="${a.password}" vs "${password}" (${passwordMatch})`);
            
            return (usernameMatch || emailMatch) && passwordMatch;
        });
        
        console.log('Login verification result:', admin);
        return admin;
    }

    // Update admin user
    updateAdminUser(adminId, updates) {
        const admins = this.getAdminUsers();
        const admin = admins.find(a => a.id === adminId);
        if (admin) {
            Object.assign(admin, updates);
            this.setData('adminUsers', admins);
            return admin;
        }
        return null;
    }

    // Get total user loyalty points (from all completed orders)
    getTotalPoints() {
        const orders = this.getData('orders') || [];
        // Sum points from all retail customer orders
        return orders.reduce((total, order) => {
            if (order.type === 'retail' && order.points) {
                return total + order.points;
            }
            return total;
        }, 0);
    }

    // Bulk user login
    bulkUserLogin(email, password) {
        const users = this.getData('bulkUsers') || [];
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            this.setData('currentBulkUser', user);
            localStorage.setItem(this.storagePrefix + 'currentBulkUserEmail', email);
            return user;
        }
        return null;
    }

    // Bulk user logout
    bulkUserLogout() {
        this.setData('currentBulkUser', null);
        localStorage.removeItem(this.storagePrefix + 'currentBulkUserEmail');
    }

    // Get current logged in bulk user
    getCurrentBulkUser() {
        return this.getData('currentBulkUser');
    }

    // Add contact message
    addContact(name, email, phone, message) {
        const contacts = this.getData('contacts') || [];
        const contact = {
            id: Date.now(),
            name: name,
            email: email,
            phone: phone,
            message: message,
            submittedDate: new Date().toLocaleString(),
            submittedTime: new Date().getTime(),
            status: 'new'
        };
        contacts.push(contact);
        this.setData('contacts', contacts);
        return contact;
    }

    // Get all contacts
    getAllContacts() {
        return this.getData('contacts') || [];
    }

    // Update contact status (admin)
    updateContactStatus(contactId, status) {
        const contacts = this.getData('contacts') || [];
        const contact = contacts.find(c => c.id === contactId);
        if (contact) {
            contact.status = status;
            this.setData('contacts', contacts);
            return true;
        }
        return false;
    }
}

// Initialize global data manager
const dataManager = new EaseDataManager();
dataManager.initializeData();
