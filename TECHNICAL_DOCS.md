# EASE System - Technical Documentation

## 🔧 Architecture Overview

The EASE system is built with a **separation of concerns** architecture:

```
┌─────────────────────────────────────────┐
│         SHARED DATA LAYER               │
│         (js/data.js)                    │
│  LocalStorage Management System         │
└─────────────────────────────────────────┘
         ↑                    ↑
    CUSTOMER SITE        ADMIN DASHBOARD
    (index.html)         (admin.html)
    (js/main.js)         (js/admin.js)
```

---

## 📦 Data Structure

### LocalStorage Keys:

All data prefixed with `EASE_` to avoid conflicts.

#### 1. **EASE_orders** (Array)
```javascript
{
    id: "ORD-1708234567890",        // Unique order ID
    type: "retail" | "bulk",        // Order type
    customerName: "John Doe",       // Customer full name
    phone: "09123456789",           // Phone number
    email: "john@email.com",        // Email address
    items: [                        // Retail only
        {
            id: 1234567890,
            name: "Executive Purple",
            price: 1850,
            quantity: 1,
            points: 100
        }
    ],
    quantity: 5,                    // Total items or bulk qty
    total: 9250,                    // Total price
    points: 500,                    // Points earned
    unitPrice: 1450,                // Bulk only
    town: "Cabagan",                // Location
    status: "pending",              // Order status
    orderDate: "1/16/2025, 2:30 PM",
    orderTime: 1708234567890,       // For sorting
    userId: null                    // Bulk user ID if applicable
}
```

#### 2. **EASE_bulkUsers** (Array)
```javascript
{
    id: 1708234567890,              // Unique user ID
    email: "company@email.com",
    fullName: "Company Name",
    phone: "09123456789",
    town: "Sto. Tomas",
    registeredDate: "1/16/2025",    // Registration date
    totalOrders: 2,                 // Orders placed
    totalPoints: 1000               // Loyalty points
}
```

#### 3. **EASE_adminUsers** (Array)
```javascript
{
    id: 1,
    username: "admin",
    password: "admin@EASE2026",
    role: "admin"
}
```

#### 4. **EASE_currentUser** (Session)
```javascript
{
    id: 1,
    username: "admin",
    password: "admin@EASE2026",
    role: "admin"
}
```

---

## 🔌 Data Management API

### EaseDataManager Class

Located in `js/data.js`

#### Methods:

```javascript
// Initialize system
dataManager.initializeData()

// Get data
dataManager.getData(key)

// Set data
dataManager.setData(key, value)

// Register bulk user
dataManager.registerBulkUser(email, fullName, phone, town)

// Get bulk user
dataManager.getBulkUserByEmail(email)

// Add order
dataManager.addOrder(orderData)

// Get all orders
dataManager.getAllOrders()

// Get orders by user
dataManager.getOrdersByUser(userId)

// Update order status
dataManager.updateOrderStatus(orderId, status)

// Get all bulk users
dataManager.getAllBulkUsers()

// Verify admin login
dataManager.verifyAdminLogin(username, password)
```

---

## 🎯 Main Site Functions (js/main.js)

### Page Navigation
```javascript
showPage(pageId)
// Switches between: home, shop, customizer, bulk
```

### Loyalty & Purchases
```javascript
buyItem(name, price, quantity = 1)
// Adds item to cart, adds 100 points per item

updatePointsDisplay()
// Updates UI with current points and unlocks VIP at 500

unlockVIPContent()
// Enables VIP products when points >= 500
```

### Shopping Cart
```javascript
toggleCart()
// Shows cart summary modal

showCheckoutModal(total)
// Confirms purchase and totals

proceedToCheckout(total)
// Collects customer info and creates order
```

### Bulk Orders
```javascript
calculateBulk()
// Calculates quotation with bulk discount

showBulkRegister()
// Opens registration modal

closeBulkModal()
// Closes registration modal

registerBulkUser()
// Registers new bulk customer and creates order
```

### Customization
```javascript
changeColor(c)
// Changes jacket preview color

togglePatch()
// Shows/hides chest patch preview
```

---

## 👨‍💼 Admin Dashboard Functions (js/admin.js)

### Authentication
```javascript
checkAdminLogin()
// Checks if admin already logged in

adminLogin()
// Verifies credentials and starts session

adminLogout()
// Ends admin session and clears data
```

### Tab Management
```javascript
switchAdminTab(tabName)
// Switches between: overview, orders, users, stats
// Valid values: 'dashboard', 'orders', 'users', 'stats'
```

### Data Loading
```javascript
loadAllData()
// Loads all orders and bulk users into memory

displayDashboard()
// Shows overview statistics

displayOrders()
// Generates orders table

displayUsers()
// Generates bulk users table

displayStats()
// Shows detailed statistics
```

### Order Management
```javascript
openOrderModal(orderId)
// Shows detailed order information

updateOrderStatus(orderId, status)
// Changes order status: pending, confirmed, shipped, delivered, cancelled

closeOrderModal()
// Closes order detail modal

exportOrdersToCSV()
// Downloads orders as CSV file
```

---

## 🎨 UI Components

### Modal Dialogs

#### Bulk Registration Modal
```html
<div id="bulk-register-modal" class="modal">
    <input id="bulk-email" placeholder="Email">
    <input id="bulk-name" placeholder="Full Name">
    <input id="bulk-phone" placeholder="Phone">
</div>
```

#### Order Details Modal (Admin)
```html
<div id="order-modal" class="modal">
    <!-- Content populated dynamically -->
</div>
```

### CSS Classes

- `.page` - Main content sections
- `.active-page` - Currently visible page
- `.modal` - Modal dialog styling
- `.admin-tab` - Admin tab content
- `.admin-table` - Responsive tables
- `.stat-card` - Statistics cards
- `.status-badge` - Order status indicators
- `.btn-primary` - Main action buttons
- `.btn-outline` - Secondary buttons

---

## 🔄 Data Flow Diagram

### Retail Purchase Flow:
```
Customer clicks "Buy & Earn Points"
        ↓
buyItem() adds to cart array
        ↓
userPoints += 100
        ↓
updatePointsDisplay() updates UI
        ↓
unlockVIPContent() checks if >= 500 points
        ↓
toggleCart() shows summary
        ↓
proceedToCheckout() collects info
        ↓
dataManager.addOrder() stores in localStorage
        ↓
Order appears in Admin Dashboard
```

### Bulk Order Flow:
```
Customer enters qty and location
        ↓
calculateBulk() shows quotation
        ↓
"Register & Place Order" button
        ↓
showBulkRegister() opens modal
        ↓
registerBulkUser() validates and registers
        ↓
dataManager.registerBulkUser() creates user
        ↓
dataManager.addOrder() creates order
        ↓
Order + User appear in Admin Dashboard
```

### Admin Order Update Flow:
```
Admin clicks "View" on order
        ↓
openOrderModal() displays details
        ↓
Admin selects new status
        ↓
updateOrderStatus() saves to localStorage
        ↓
loadAllData() refreshes display
        ↓
All admins see updated status (if shared session)
```

---

## 🔐 Authentication Flow

### Admin Login:
```
1. adminLogin() gets credentials
2. dataManager.verifyAdminLogin() checks against adminUsers array
3. If valid:
   - Set adminLoggedIn = true
   - Store to localStorage as EASE_adminLoggedIn
   - Show dashboard
   - Load all data
4. If invalid:
   - Show error alert
   - Stay on login screen
```

### Admin Logout:
```
1. adminLogout() confirms action
2. Clear adminLoggedIn flag
3. Remove EASE_adminLoggedIn from localStorage
4. Return to login screen
```

---

## 📊 Calculations

### Points Calculation:
```javascript
// Each item purchase
points = quantity * 100

// VIP unlock threshold
if (userPoints >= 500) {
    unlockVIPContent()
}
```

### Bulk Discount:
```javascript
const unitPrice = 1450
const total = quantity * unitPrice
const discount = Math.floor((quantity / 100) * 5)
// 5% discount per 100 pieces
final = total - discount
```

### Revenue Tracking:
```javascript
totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
averageOrderValue = totalRevenue / orders.length
```

---

## 🐛 Error Handling

### Input Validation:
```javascript
// Bulk order minimum
if (q < 20 || t === '0') {
    alert("Please complete the form (Min 20 pieces)")
    return
}

// Email format not explicitly validated
// Phone validation not enforced
// Name required but no format check
```

### Fallback Values:
```javascript
allOrders = dataManager.getAllOrders() || []
allBulkUsers = dataManager.getAllBulkUsers() || []
cart = [] // Resets on checkout
```

---

## 🚀 Performance Considerations

### Optimization Done:
1. **LocalStorage caching** - Fast data access
2. **Lazy loading** - Modals load on demand
3. **Event delegation** - Single listener for multiple buttons
4. **Auto-refresh** - Admin dashboard updates every 30 seconds

### Potential Improvements:
1. Add pagination for large order lists
2. Implement search/filter on orders
3. Add date range filtering
4. Cache computed statistics
5. Lazy-load images in product gallery

---

## 🔗 Integration Points

### To Connect Backend Database:

Replace LocalStorage calls in `data.js`:
```javascript
// Instead of:
localStorage.setItem(key, JSON.stringify(value))

// Use:
fetch('/api/save', {
    method: 'POST',
    body: JSON.stringify({key, value})
})
```

### To Add Email Notifications:

Add to `proceedToCheckout()`:
```javascript
sendEmail(email, {
    subject: `Order #${order.id} Received`,
    body: `Your order has been received...`
})
```

### To Add Payment Gateway:

In `proceedToCheckout()`:
```javascript
stripe.redirectToCheckout({
    sessionId: sessionId
})
.then(order => dataManager.addOrder(order))
```

---

## 📝 Code Comments

Comments throughout codebase explain:
- Function purposes
- Parameter descriptions
- Complex logic flow
- Assumptions and limitations

Search for `//` and `/* */` block comments throughout code.

---

## 🧪 Testing Checklist

- [ ] Test retail purchase flow
- [ ] Verify points increase by 100 per item
- [ ] Test VIP unlock at 500 points
- [ ] Test bulk registration with min 20 quantity
- [ ] Test admin login with correct credentials
- [ ] Test admin login with wrong credentials
- [ ] Test order status update
- [ ] Test CSV export
- [ ] Test on mobile device
- [ ] Test browser back button
- [ ] Test page refresh preserves data
- [ ] Test clear browser cache scenario

---

## 📚 Related Files

- `index/index.html` - Customer interface
- `admin.html` - Admin interface  
- `js/data.js` - Data layer
- `js/main.js` - Customer logic
- `js/admin.js` - Admin logic
- `README.md` - Full documentation
- `QUICK_START.md` - User guide

---

**Technical Documentation v1.0 | 2026**
