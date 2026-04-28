# ✅ ADMIN DASHBOARD - Complete Setup Guide

## 📌 Quick Start

**New Admin Dashboard File:** `admin-dashboard.html`

**Login Credentials:**
```
Email: ease@gmail.com
Password: ease123

OR

Username: admin
Password: ease123
```

---

## 🚀 Step-by-Step Testing

### Step 1: Open Admin Dashboard
1. Open `admin-dashboard.html` in your browser
2. Should see purple gradient login screen
3. Email and password fields are **pre-filled** with demo credentials

### Step 2: Click "Login" Button
1. Click the "Login" button
2. Should see success message: "✅ Login successful! Welcome EASE Admin"
3. Should see the dashboard with 4 tabs

### Step 3: Check Browser Console
1. Press **F12** (Developer Tools)
2. Click **Console** tab
3. You should see messages like:
   ```
   🚀 Admin Dashboard Initializing...
   🔍 Checking admin data...
   ✅ Admin users exist: [...]
   ✅ Orders initialized
   ✅ Bulk Users initialized
   ✅ Contacts initialized
   ✅ Audit Log initialized
   ℹ️ No admin session, showing login screen
   ✅ Admin Dashboard Ready
   ```

### Step 4: Try Each Tab
After login, you can see:

- **📦 Orders Tab**
  - Shows all orders from regular customers
  - Shows: Order ID, Customer name, Amount, Status, Payment, Date
  - Click "View" to see full order details
  - Search by Order ID

- **👤 Registrations Tab**
  - Shows all bulk order registrations
  - Shows: Name, Email, Phone, Town, Registration Date, Orders, Points
  - Click "View" to see user details including audit history
  - Search by name or email

- **📧 Messages Tab**
  - Shows all contact form messages
  - Shows: Name, Email, Subject, Status, Date
  - Click "View" to read full message
  - Click "Delete" to remove message
  - Search by name

- **📋 Audit Log Tab**
  - Shows all admin actions
  - Shows: Timestamp, Action, User, Details
  - Automatically logs: logins, logouts, viewed records, deleted items

---

## 🔍 Debugging Commands

### View All Data
Open browser console (F12) and type:
```javascript
adminDebug()
```

This shows:
- Number of orders
- Number of bulk users
- Number of contacts
- Audit logs
- Admin credentials
- Current logged-in user

### Manually Check Admin Credentials
```javascript
JSON.parse(localStorage.getItem('EASE_adminUsers'))
```

Should show:
```javascript
[
  {
    id: 1,
    username: "admin",
    email: "ease@gmail.com",
    password: "ease123",
    role: "admin",
    fullName: "EASE Admin"
  }
]
```

### Check Current Session
```javascript
JSON.parse(localStorage.getItem('EASE_adminLoggedIn'))
```

Should show admin object if logged in, null if logged out.

### View All Orders
```javascript
JSON.parse(localStorage.getItem('EASE_orders'))
```

### View All Bulk Users
```javascript
JSON.parse(localStorage.getItem('EASE_bulkUsers'))
```

### View All Contacts
```javascript
JSON.parse(localStorage.getItem('EASE_contacts'))
```

### View Audit Log
```javascript
JSON.parse(localStorage.getItem('EASE_auditLog'))
```

---

## ⚠️ If Login Doesn't Work

### Issue: Says "Invalid email/username or password"

**Step 1: Check Console Output**
- Press F12
- Look for error messages starting with ❌
- Copy the exact error

**Step 2: Verify Admin Data Exists**
```javascript
adminDebug()
```
Look for "Admin Users: 1" - if it says 0, run:
```javascript
localStorage.setItem('EASE_adminUsers', JSON.stringify([{id: 1, username: 'admin', email: 'ease@gmail.com', password: 'ease123', role: 'admin', fullName: 'EASE Admin'}]))
```

**Step 3: Clear and Reload**
- Press Ctrl+Shift+Delete to clear browser cache
- Close and reopen the page
- Try login again

**Step 4: Check Credentials Exactly**
```javascript
const admins = JSON.parse(localStorage.getItem('EASE_adminUsers'));
console.log('Email in storage:', admins[0].email);
console.log('Password in storage:', admins[0].password);
```

Make sure:
- Email is exactly: `ease@gmail.com` (lowercase)
- Password is exactly: `ease123`

---

## 📊 Dashboard Features

### Statistics Cards
- **Total Orders**: All orders from the website
- **Bulk Users**: All registered bulk order users
- **Pending Orders**: Orders waiting to be processed
- **Messages**: Contact form submissions

### Search Functionality
Each tab has a search box:
- Orders: Search by Order ID
- Registrations: Search by name or email
- Messages: Search by name

### View Details
Click "View" on any row to see:
- Full information
- Item details
- Timestamps
- Relevant history

### Delete Functionality
Click "Delete" to remove:
- Contact messages (with confirmation)

### Logout
Click "Logout" button to exit dashboard and return to login screen.

---

## 📋 Data Structure

All data is stored in browser's localStorage with these keys:

```
EASE_adminUsers       → Admin login credentials
EASE_orders           → All customer orders
EASE_bulkUsers        → Bulk order users + registrations
EASE_contacts         → Contact form messages
EASE_auditLog         → Admin action history
EASE_adminLoggedIn    → Current admin session
```

---

## ✅ Troubleshooting Checklist

- [ ] Admin dashboard opens (admin-dashboard.html)
- [ ] Login page shows with pre-filled credentials
- [ ] Console shows "✅ Admin Dashboard Ready"
- [ ] Can click Login button without errors
- [ ] Dashboard appears after login
- [ ] All 4 tabs are clickable
- [ ] Statistics show correct numbers
- [ ] Can see data in each tab
- [ ] Search works on tabs
- [ ] Can view details without errors
- [ ] Can logout successfully

If ANY of these fail, check the browser console (F12) for exact error messages and run `adminDebug()`.
