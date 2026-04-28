// EASE Admin Dashboard JavaScript

let adminLoggedIn = false;
let adminUser = null;
let allOrders = [];
let allBulkUsers = [];

// SIMPLE ADMIN CREDENTIALS - Direct without dataManager
const DEFAULT_ADMIN = {
    id: 1,
    username: 'admin',
    email: 'ease@gmail.com',
    password: 'ease123',
    role: 'admin',
    fullName: 'EASE Admin'
};

// Initialize admin when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Admin Dashboard Loading...');
    
    // Create admin account in localStorage if it doesn't exist
    ensureAdminExists();
    
    // Check if already logged in
    checkAdminLogin();
});

// Ensure admin account exists in localStorage
function ensureAdminExists() {
    const storedAdmins = localStorage.getItem('EASE_adminUsers');
    if (!storedAdmins) {
        localStorage.setItem('EASE_adminUsers', JSON.stringify([DEFAULT_ADMIN]));
        console.log('✅ Admin account created in localStorage');
    }
}

// Check if admin is logged in
function checkAdminLogin() {
    const savedAdmin = localStorage.getItem('EASE_adminLoggedIn');
    if (savedAdmin) {
        try {
            adminUser = JSON.parse(savedAdmin);
            adminLoggedIn = true;
            console.log('✅ Admin session found:', adminUser.email);
            showDashboard();
            loadAllData();
        } catch (e) {
            console.error('Error parsing admin session:', e);
            showLoginScreen();
        }
    } else {
        console.log('No admin session, showing login screen');
        showLoginScreen();
    }
}

// Show login screen
function showLoginScreen() {
    document.getElementById('login-container').style.display = 'flex';
    document.getElementById('dashboard-container').style.display = 'none';
}

// Show dashboard
function showDashboard() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('dashboard-container').style.display = 'block';
}

// Admin login function - SIMPLE AND DIRECT
function adminLogin() {
    const username = document.getElementById('admin-username').value.trim();
    const password = document.getElementById('admin-password').value.trim();

    console.log('=== ADMIN LOGIN ATTEMPT ===');
    console.log('Username entered:', username);
    console.log('Password entered:', password);

    // Validation
    if (!username || !password) {
        alert('❌ Please enter both email/username and password');
        return;
    }

    // Get stored admins directly from localStorage
    let adminUsers = [];
    try {
        const stored = localStorage.getItem('EASE_adminUsers');
        if (stored) {
            adminUsers = JSON.parse(stored);
            console.log('✅ Found stored admin users:', adminUsers);
        } else {
            console.log('⚠️ No admin users in storage, creating default...');
            adminUsers = [DEFAULT_ADMIN];
            localStorage.setItem('EASE_adminUsers', JSON.stringify(adminUsers));
        }
    } catch (e) {
        console.error('❌ Error reading admin users:', e);
        adminUsers = [DEFAULT_ADMIN];
        localStorage.setItem('EASE_adminUsers', JSON.stringify(adminUsers));
    }

    console.log('All admin users:', adminUsers);

    // Find matching admin
    const admin = adminUsers.find(a => {
        const usernameMatch = a.username === username;
        const emailMatch = a.email === username;
        const passwordMatch = a.password === password;
        
        console.log(`Checking: username="${a.username}" vs "${username}" (match: ${usernameMatch}), email="${a.email}" vs "${username}" (match: ${emailMatch}), password match: ${passwordMatch}`);
        
        return (usernameMatch || emailMatch) && passwordMatch;
    });

    if (admin) {
        console.log('✅ LOGIN SUCCESS:', admin);
        adminUser = admin;
        adminLoggedIn = true;
        localStorage.setItem('EASE_adminLoggedIn', JSON.stringify(admin));
        
        // Clear form
        document.getElementById('admin-username').value = '';
        document.getElementById('admin-password').value = '';
        
        // Show dashboard
        showDashboard();
        loadAllData();
        
        alert('✅ Login successful!\nWelcome, ' + admin.fullName + '!');
    } else {
        console.log('❌ LOGIN FAILED');
        console.log('Expected credentials:');
        console.log('  - Username: admin OR ease@gmail.com');
        console.log('  - Password: ease123');
        alert('❌ Login Failed!\n\nPlease use:\n\nUsername: ease@gmail.com\nPassword: ease123');
    }
}

// Admin logout
function adminLogout() {
    if (confirm('Are you sure you want to logout?')) {
        adminLoggedIn = false;
        adminUser = null;
        localStorage.removeItem('EASE_adminLoggedIn');
        showLoginScreen();
    }
}

// Load all data
function loadAllData() {
    console.log('Loading dashboard data...');
    
    try {
        // Get orders from localStorage if dataManager is available
        if (typeof dataManager !== 'undefined' && dataManager && typeof dataManager.getAllOrders === 'function') {
            allOrders = dataManager.getAllOrders();
            allBulkUsers = dataManager.getAllBulkUsers();
        } else {
            // Fallback: get from localStorage directly
            const ordersData = localStorage.getItem('EASE_orders');
            const usersData = localStorage.getItem('EASE_bulkUsers');
            
            allOrders = ordersData ? JSON.parse(ordersData) : [];
            allBulkUsers = usersData ? JSON.parse(usersData) : [];
        }
        
        console.log('Dashboard data loaded - Orders:', allOrders.length, 'Users:', allBulkUsers.length);
        displayDashboard();
    } catch (e) {
        console.error('Error loading data:', e);
        allOrders = [];
        allBulkUsers = [];
        displayDashboard();
    }
}

// Switch between tabs
function switchAdminTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.admin-tab').forEach(tab => tab.style.display = 'none');
    document.querySelectorAll('.admin-nav button').forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    document.getElementById(tabName + '-tab').style.display = 'block';
    event.target.classList.add('active');

    // Refresh data based on tab
    if (tabName === 'orders') {
        displayOrders();
    } else if (tabName === 'users') {
        displayUsers();
    } else if (tabName === 'contacts') {
        displayContacts();
    } else if (tabName === 'stats') {
        displayStats();
    }
}

// Display dashboard overview
function displayDashboard() {
    const stats = {
        totalOrders: allOrders.length,
        totalRevenue: allOrders.reduce((sum, o) => sum + o.total, 0),
        totalBulkUsers: allBulkUsers.length,
        pendingOrders: allOrders.filter(o => o.status === 'pending').length
    };

    const dashboardHTML = `
    <div class="admin-dashboard">
        <h2 style="margin-bottom: 30px;">Dashboard Overview</h2>
        <div class="stats-grid">
            <div class="stat-card">
                <h3>${stats.totalOrders}</h3>
                <p>Total Orders</p>
            </div>
            <div class="stat-card">
                <h3>₱${stats.totalRevenue.toLocaleString()}</h3>
                <p>Total Revenue</p>
            </div>
            <div class="stat-card">
                <h3>${stats.pendingOrders}</h3>
                <p>Pending Orders</p>
            </div>
            <div class="stat-card">
                <h3>${stats.totalBulkUsers}</h3>
                <p>Bulk Users</p>
            </div>
        </div>
    </div>
    `;
    document.getElementById('dashboard-overview').innerHTML = dashboardHTML;
}

// Display all orders
function displayOrders() {
    let orderHTML = '<h3>All Orders</h3><div style="overflow-x: auto;">';
    
    if (allOrders.length === 0) {
        orderHTML += '<p style="text-align: center; padding: 40px;">No orders yet</p>';
    } else {
        orderHTML += `
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Payment Method</th>
                    <th>Payment Status</th>
                    <th>Order Status</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>`;
        
        allOrders.sort((a, b) => b.orderTime - a.orderTime).forEach(order => {
            const statusColor = {
                'pending': '#ff9800',
                'confirmed': '#4caf50',
                'shipped': '#2196f3',
                'delivered': '#4caf50',
                'cancelled': '#f44336'
            };
            
            const paymentStatusColor = {
                'pending': '#ff9800',
                'paid': '#4caf50',
                'failed': '#f44336',
                'completed': '#4caf50'
            };
            
            orderHTML += `
            <tr>
                <td><strong>${order.id}</strong></td>
                <td>${order.customerName}</td>
                <td>${order.type === 'bulk' ? '📦 Bulk' : '🛍️ Retail'}</td>
                <td>₱${order.total.toLocaleString()}</td>
                <td>${order.paymentMethod === 'gcash' ? '📱 GCash' : '💵 Cash'}</td>
                <td><span class="status-badge" style="background: ${paymentStatusColor[order.paymentStatus] || '#999'};">${(order.paymentStatus || 'pending').toUpperCase()}</span></td>
                <td><span class="status-badge" style="background: ${statusColor[order.status] || '#999'};">${order.status.toUpperCase()}</span></td>
                <td>${order.orderDate}</td>
                <td>
                    <button class="btn-small" onclick="openOrderModal('${order.id}')">View</button>
                </td>
            </tr>`;
        });
        
        orderHTML += '</tbody></table>';
    }
    
    orderHTML += '</div>';
    document.getElementById('orders-tab').innerHTML = orderHTML;
}

// Display bulk users
function displayUsers() {
    let userHTML = '<h3>Registered Bulk Users</h3><div style="overflow-x: auto;">';
    
    if (allBulkUsers.length === 0) {
        userHTML += '<p style="text-align: center; padding: 40px;">No bulk users registered yet</p>';
    } else {
        userHTML += `
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>Registered</th>
                    <th>Orders</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>`;
        
        allBulkUsers.forEach(user => {
            userHTML += `
            <tr>
                <td><strong>${user.fullName}</strong></td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.town}</td>
                <td>${user.registeredDate}</td>
                <td>${user.totalOrders}</td>
                <td>${user.totalPoints}</td>
            </tr>`;
        });
        
        userHTML += '</tbody></table>';
    }
    
    userHTML += '</div>';
    document.getElementById('users-tab').innerHTML = userHTML;
}

// Display statistics
function displayStats() {
    const stats = {
        totalOrders: allOrders.length,
        totalRevenue: allOrders.reduce((sum, o) => sum + o.total, 0),
        retailOrders: allOrders.filter(o => o.type === 'retail').length,
        bulkOrders: allOrders.filter(o => o.type === 'bulk').length,
        averageOrderValue: allOrders.length > 0 ? Math.round(allOrders.reduce((sum, o) => sum + o.total, 0) / allOrders.length) : 0,
        totalBulkUsers: allBulkUsers.length,
        systemPoints: allBulkUsers.reduce((sum, u) => sum + u.totalPoints, 0)
    };

    let statsHTML = `
    <h3>System Statistics</h3>
    <div class="stats-grid">
        <div class="stat-card full">
            <h2 style="color: #4a148c;">₱${stats.totalRevenue.toLocaleString()}</h2>
            <p>Total Revenue</p>
        </div>
        <div class="stat-card">
            <h2>${stats.totalOrders}</h2>
            <p>Total Orders</p>
        </div>
        <div class="stat-card">
            <h2>${stats.retailOrders}</h2>
            <p>Retail Orders</p>
        </div>
        <div class="stat-card">
            <h2>${stats.bulkOrders}</h2>
            <p>Bulk Orders</p>
        </div>
        <div class="stat-card">
            <h2>₱${stats.averageOrderValue.toLocaleString()}</h2>
            <p>Avg Order Value</p>
        </div>
        <div class="stat-card">
            <h2>${stats.totalBulkUsers}</h2>
            <p>Bulk Users</p>
        </div>
        <div class="stat-card">
            <h2>${stats.systemPoints}</h2>
            <p>Total Points</p>
        </div>
    </div>
    `;
    
    document.getElementById('stats-tab').innerHTML = statsHTML;
}

// Open order details modal
function openOrderModal(orderId) {
    const order = allOrders.find(o => o.id === orderId);
    if (!order) return;

    let itemsHTML = '';
    if (order.items && Array.isArray(order.items)) {
        itemsHTML = order.items.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>₱${item.price.toLocaleString()}</td>
            <td>₱${(item.quantity * item.price).toLocaleString()}</td>
        </tr>`).join('');
    }

    const modalContent = `
    <div class="modal-header">
        <h2>Order #${order.id}</h2>
        <button class="modal-close" onclick="closeOrderModal()">&times;</button>
    </div>
    <div class="modal-body">
        <div class="modal-section">
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> ${order.customerName}</p>
            <p><strong>Email:</strong> ${order.email}</p>
            <p><strong>Phone:</strong> ${order.phone}</p>
            <p><strong>Type:</strong> ${order.type === 'bulk' ? 'Bulk Order' : 'Retail Order'}</p>
            ${order.town ? `<p><strong>Delivery Location:</strong> ${order.town}</p>` : ''}
        </div>

        <div class="modal-section">
            <h3>Order Details</h3>
            <p><strong>Order Date:</strong> ${order.orderDate}</p>
            <p><strong>Status:</strong> <span class="status-badge">${order.status.toUpperCase()}</span></p>
            <p><strong>Quantity:</strong> ${order.quantity} pcs</p>
        </div>

        ${itemsHTML ? `
        <div class="modal-section">
            <h3>Items Ordered</h3>
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Unit Price</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHTML}
                </tbody>
            </table>
        </div>` : ''}

        <div class="modal-section" style="border: 2px solid #4a148c; padding: 15px; border-radius: 10px;">
            <h3 style="color: #4a148c;">TOTAL: ₱${order.total.toLocaleString()}</h3>
            <p><strong>Points:</strong> ${order.points || 0}</p>
        </div>

        <div class="modal-section">
            <h3>Update Status</h3>
            <select id="new-status" style="padding: 12px; border-radius: 8px; border: 1px solid #ddd; width: 100%; margin-bottom: 15px;">
                <option value="">-- Select New Status --</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
            </select>
            <button class="btn btn-primary" onclick="updateOrderStatus('${order.id}')">Update Status</button>
        </div>
    </div>
    `;

    document.getElementById('order-modal').innerHTML = modalContent;
    document.getElementById('order-modal').style.display = 'block';
}

function closeOrderModal() {
    document.getElementById('order-modal').style.display = 'none';
}

function updateOrderStatus(orderId) {
    const newStatus = document.getElementById('new-status').value;
    if (!newStatus) {
        alert('Please select a status');
        return;
    }

    dataManager.updateOrderStatus(orderId, newStatus);
    loadAllData();
    closeOrderModal();
    alert('Order status updated successfully!');
}

// Export data to CSV
function exportOrdersToCSV() {
    let csv = 'Order ID,Customer,Type,Phone,Email,Amount,Quantity,Status,Date\n';
    allOrders.forEach(order => {
        csv += `"${order.id}","${order.customerName}","${order.type}","${order.phone}","${order.email}",${order.total},${order.quantity},"${order.status}","${order.orderDate}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'EASE_Orders_' + new Date().toISOString().split('T')[0] + '.csv';
    a.click();
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('order-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Display contact messages
function displayContacts() {
    let allContacts = [];
    
    try {
        if (typeof dataManager !== 'undefined' && dataManager && typeof dataManager.getAllContacts === 'function') {
            allContacts = dataManager.getAllContacts();
        } else {
            const contacts = localStorage.getItem('EASE_contacts');
            allContacts = contacts ? JSON.parse(contacts) : [];
        }
    } catch (e) {
        console.error('Error loading contacts:', e);
        allContacts = [];
    }

    let contactHTML = '<h3>Customer Contact Messages</h3><div style="overflow-x: auto;">';
    
    if (allContacts.length === 0) {
        contactHTML += '<p style="text-align: center; padding: 40px;">No contact messages yet</p>';
    } else {
        contactHTML += `
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Message</th>
                    <th>Submitted</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>`;
        
        allContacts.sort((a, b) => b.submittedTime - a.submittedTime).forEach(contact => {
            const statusColor = {
                'new': '#2196f3',
                'read': '#ff9800',
                'replied': '#4caf50',
                'resolved': '#4caf50'
            };
            
            const messagePreview = contact.message.substring(0, 50) + (contact.message.length > 50 ? '...' : '');
            
            contactHTML += `
            <tr>
                <td><strong>${contact.name}</strong></td>
                <td>${contact.email}</td>
                <td>${contact.phone || 'N/A'}</td>
                <td>${messagePreview}</td>
                <td>${contact.submittedDate}</td>
                <td><span class="status-badge" style="background: ${statusColor[contact.status] || '#999'};">${contact.status.toUpperCase()}</span></td>
                <td>
                    <button class="btn-small" onclick="showContactDetail('${contact.id}')">View</button>
                </td>
            </tr>`;
        });
        
        contactHTML += '</tbody></table>';
    }
    
    contactHTML += '</div>';
    document.getElementById('contacts-tab').innerHTML = contactHTML;
}

// Show contact detail
function showContactDetail(contactId) {
    const allContacts = dataManager.getAllContacts();
    const contact = allContacts.find(c => c.id == contactId);
    if (!contact) return;
    
    const modal = document.getElementById('order-modal');
    const modalContent = `
    <div class="modal-header">
        <h2>Contact Message from ${contact.name}</h2>
        <button class="modal-close" onclick="closeOrderModal()">&times;</button>
    </div>
    <div class="modal-body">
        <div class="modal-section">
            <h3>Sender Information</h3>
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Phone:</strong> ${contact.phone || 'Not provided'}</p>
            <p><strong>Submitted:</strong> ${contact.submittedDate}</p>
        </div>
        
        <div class="modal-section">
            <h3>Message</h3>
            <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 10px; border-left: 4px solid #4a148c;">
                ${contact.message}
            </p>
        </div>
        
        <div class="modal-section">
            <h3>Status</h3>
            <select id="contact-status" onchange="updateContactStatus('${contact.id}', this.value)" style="padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px;">
                <option value="new" ${contact.status === 'new' ? 'selected' : ''}>New</option>
                <option value="read" ${contact.status === 'read' ? 'selected' : ''}>Read</option>
                <option value="replied" ${contact.status === 'replied' ? 'selected' : ''}>Replied</option>
                <option value="resolved" ${contact.status === 'resolved' ? 'selected' : ''}>Resolved</option>
            </select>
            <p style="font-size: 12px; margin-top: 10px; opacity: 0.7;">Update the status of this message for tracking.</p>
        </div>
        
        <div style="text-align: center; margin-top: 20px;">
            <p style="font-size: 12px; opacity: 0.6;">💡 Tip: Click "Replied" or "Resolved" once you've responded to the customer.</p>
        </div>
    </div>
    `;
    
    modal.innerHTML = modalContent;
    modal.style.display = 'block';
}

// Update contact status
function updateContactStatus(contactId, newStatus) {
    try {
        if (typeof dataManager !== 'undefined' && dataManager && typeof dataManager.updateContactStatus === 'function') {
            dataManager.updateContactStatus(contactId, newStatus);
        } else {
            // Fallback: update in localStorage directly
            let contacts = [];
            const stored = localStorage.getItem('EASE_contacts');
            if (stored) {
                contacts = JSON.parse(stored);
                const contact = contacts.find(c => c.id == contactId);
                if (contact) {
                    contact.status = newStatus;
                    localStorage.setItem('EASE_contacts', JSON.stringify(contacts));
                }
            }
        }
        displayContacts();
        closeOrderModal();
        alert('✅ Contact status updated!');
    } catch (e) {
        console.error('Error updating contact status:', e);
        alert('Error updating status');
    }
}

// Auto-refresh data every 30 seconds
setInterval(function() {
    if (adminLoggedIn) {
        loadAllData();
    }
}, 30000);

// ========== DEBUG FUNCTIONS ==========
// TEST FUNCTION: Call this from console to test login manually
window.testAdminLogin = function() {
    console.log('=== ADMIN LOGIN TEST ===');
    console.log('1. Testing DataManager...');
    if (typeof dataManager === 'undefined') {
        console.error('❌ DataManager is not defined');
        return;
    }
    console.log('✅ DataManager found');
    
    console.log('2. Initializing DataManager...');
    dataManager.initializeData();
    
    console.log('3. Getting admin users...');
    const admins = dataManager.getAdminUsers();
    console.log('Admin users:', admins);
    
    console.log('4. Verifying login with ease@gmail.com / ease123...');
    const result = dataManager.verifyAdminLogin('ease@gmail.com', 'ease123');
    console.log('Login result:', result);
    
    if (result) {
        console.log('✅ LOGIN TEST PASSED!');
        return true;
    } else {
        console.log('❌ LOGIN TEST FAILED');
        return false;
    }
};

window.clearAdminData = function() {
    console.log('Clearing all EASE data from localStorage...');
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('EASE_')) {
            localStorage.removeItem(key);
            console.log('Removed:', key);
        }
    });
    console.log('✅ All EASE data cleared. Page will refresh...');
    setTimeout(() => {
        location.reload();
    }, 1000);
};

console.log('✅ Admin Dashboard loaded. Type testAdminLogin() to test login.');

