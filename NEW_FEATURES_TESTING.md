# EASE Apparel - Payment & Bulk Feature Testing Guide

## ✨ NEW FEATURES JUST IMPLEMENTED

This guide helps you test all the new payment, bulk user, and contact features.

---

## 🎯 Quick Start - What's New

### Feature 1: Payment System
- **Cash on Delivery** - Manual payment
- **GCash** - Digital payment with dynamic QR code

### Feature 2: Bulk User System  
- **Registration** - Auto-register on first bulk order
- **Login/Logout** - Email + password authentication
- **Flexible Quantity** - Order any amount (1+)

### Feature 3: Contact Form
- **New Contact Page** - Reach out to EASE
- **Admin Contacts Tab** - See all customer messages
- **Message Tracking** - Mark as new, read, replied, resolved

### Feature 4: Enhanced Admin
- **Payment Columns** - See payment method & status
- **Contact Management** - Full message viewing & status updates
- **Audit Trails** - Track all user actions

---

## 📱 TEST SCENARIO 1: Retail Customer (No Account)

### Goal: Shop and checkout with payment selection

**Steps:**
1. Open `index/index.html`
2. Go to **Shop** section
3. Click **"Buy & Earn Points"** on "Executive Purple Varsity"
4. **Verify**: Notification "✅ Added to cart!" appears
5. Click shopping bag icon (top right)
6. **Verify**: Cart modal shows the item with price
7. Click **"Complete Order"** button
8. **Verify**: Checkout form appears with fields:
   - Name
   - Email  
   - Phone
   - Payment method (Cash | GCash)

**Test Cash Payment:**
9. Leave "💵 Cash on Delivery" selected
10. Fill in your details
11. Click **"Complete Order"**
12. **Verify**: Success notification appears
13. Cart is cleared

**Verify in Admin:**
14. Open `admin.html`
15. Login: `admin` / `admin@EASE2026`
16. Go to **Orders** tab
17. **Verify** new order appears showing:
    - ✨ Payment Method: "💵 Cash"
    - ✨ Payment Status: "PENDING" (orange badge)

---

## 💳 TEST SCENARIO 2: GCash Payment

### Goal: Test dynamic QR code generation

**Steps:**
1. Go to **Shop**
2. Add another item to cart
3. Click shopping bag → **"Complete Order"**
4. Fill customer details
5. **Select** "📱 GCash Payment" radio button
6. **Verify**: Yellow/orange section appears showing:
    - GCash instructions
    - ✨ **Dynamic QR Code Image** (generated from api.qrserver.com)
    - Payment reference number request
7. Click **"Complete Order"**
8. **Verify**: Success notification

**Verify in Admin:**
9. Admin → **Orders** tab
10. **Verify** new order shows:
    - ✨ Payment Method: "📱 GCash"
    - Payment Status: "PENDING"
11. Click **View** to see order details
12. **Verify** modal shows:
    - Payment method: GCash
    - Payment status tracking

---

## 👤 TEST SCENARIO 3: Bulk User Registration

### Goal: Register new account, order flexible quantity

**Steps:**
1. Click **"[Sign In / Register]"** button (top navigation)
2. **Verify**: Modal appears with:
    - Email field
    - Password field
3. Enter new email: `test@mycompany.com`
4. Enter password: `password123`
5. Click **"Sign In / Register"**
6. **Verify**: New form appears asking for:
    - Full Name
    - Phone Number
    - Delivery Location (dropdown)
7. Fill in:
    - Name: `My Company`
    - Phone: `09123456789`
    - Location: `Cabagan`
8. Click **"Complete Registration"**
9. **Verify**: Success notification, auto-navigate to Bulk Orders page
10. **Verify** logged-in state shows in navbar:
    - User display shows "Bulk User Logged In"
    - Shows your name/email
    - "[Sign Out]" link appears

**Test Bulk Ordering:**
11. On **Bulk Orders** page, enter quantity: `15`
12. Select location: `Sto. Tomas` (already selected)
13. Click **"Get Quotation"**
14. **Verify**: Shows calculation:
    - Quantity: 15 pcs
    - Unit Price: ₱1,450
    - Subtotal: ₱21,750
    - Final Total: ₱21,750 (no discount for <20)
15. Click **"Add to Cart"**
16. Cart badge updates
17. Click shopping bag
18. **Verify**: Cart shows bulk order item
19. Click **"Complete Order"**
20. **Verify**: Checkout shows your info pre-filled
21. Select payment method (try GCash)
22. Click **"Complete Order"**
23. **Verify**: Success notification

**Verify in Admin:**
24. Admin → **Orders** tab
25. **Verify** new order shows:
    - Type: "📦 Bulk"
    - Your company name
    - ✨ Payment Method: GCash (if selected)
    - ✨ Payment Status: PENDING
    - Amount: ₱21,750
26. Click **View** to see full details
27. **Verify** order linked to bulk user

---

## 📊 TEST SCENARIO 4: Bulk User Login

### Goal: Existing user login and re-order

**Steps:**
1. **Sign Out** - Click "[Sign Out]" in navbar
2. **Verify**: Logged out message, back to login state
3. Click **"[Sign In / Register]"** again
4. Enter email: `test@mycompany.com`
5. Enter password: `password123`
6. Click **"Sign In / Register"**
7. **Verify**: "✅ Welcome back!" message
8. **Verify**: Automatically on Bulk Orders page
9. **Verify**: Navbar shows logged-in state

**Test Larger Order (for bulk discount):**
10. Enter quantity: `25`
11. Select location
12. Click **"Get Quotation"**
13. **Verify**: Shows calculation with:
    - ✨ **Bulk Discount (≥20): -₱1,812.50** (5% off)
    - Final Total: ₱19,937.50 (discounted)
14. Complete order with preferred payment method

**Verify in Admin:**
15. Admin → **Orders** tab
16. **Verify** new order shows bulk discount applied

---

## 📧 TEST SCENARIO 5: Contact Form

### Goal: Submit customer message, manage in admin

**Customer Side:**
1. Click **"Contact"** in navigation
2. **Verify**: Contact page loads
3. Click **"📧 Open Contact Form"** button
4. **Verify**: Modal appears with:
    - Name field
    - Email field
    - Phone field (optional)
    - Message textarea
5. Fill in:
    - Name: `John Doe`
    - Email: `john@example.com`
    - Phone: `09123456789`
    - Message: `I am interested in bulk orders for my company. What is your minimum order quantity?`
6. Click **"Send Message"**
7. **Verify**: Success notification appears

**Admin Side - Manage Contacts:**
8. Admin dashboard
9. **Verify** new tab: **"Contacts"** in sidebar
10. Click **"Contacts"** tab
11. **Verify**: Table shows:
    - Message from John Doe
    - Email: john@example.com
    - Phone: 09123456789
    - Message preview
    - Submitted date/time
    - ✨ Status badge: "NEW" (blue)
12. Click **"View"** button
13. **Verify**: Modal shows:
    - Full message text
    - All sender details
    - ✨ Status dropdown (new, read, replied, resolved)
14. Change status: Select **"Replied"**
15. **Verify**: Status updates in list to "REPLIED" (green)
16. Try **"Resolved"** status
17. **Verify**: Status badge color changes

---

## 🔍 TEST SCENARIO 6: Admin Dashboard Enhancements

### Goal: Verify all new admin columns and tabs

**Dashboard Tab:**
1. Admin → Click "Dashboard" tab
2. **Verify**: Overview shows 4 stats cards

**Orders Tab - New Features:**
3. Click **"Orders"** tab
4. **Verify** new table columns (5 new columns!):
    - ✨ Payment Method (Cash/GCash icon)
    - ✨ Payment Status (pending/paid/failed/completed)
    - ✨ Order Status (existing but reorganized)
5. **Verify** all test orders appear with correct:
    - Payment Method icon
    - Payment Status badge color
    - Customer name
    - Order type icon
6. Click **"View"** on a GCash order
7. **Verify** order modal shows:
    - Payment method
    - Payment status
    - Audit trail (if applicable)

**Bulk Users Tab:**
8. Click **"Bulk Users"** tab
9. **Verify**: Registered bulk user appears with:
    - Full name
    - Email
    - Phone
    - Location
    - Total orders count
    - Total points

**Contacts Tab:**
10. Click **"Contacts"** tab (already tested in Scenario 5)
11. **Verify**: All contact submissions appear

**Statistics Tab:**
12. Click **"Statistics"** tab
13. **Verify**: Shows system-wide metrics

---

## 🎯 PASS/FAIL CHECKLIST

### Payment System
- [ ] Cash payment option visible and selectable
- [ ] GCash option visible and selectable
- [ ] GCash QR code displays dynamically
- [ ] Payment method stored with order
- [ ] Admin sees payment method in table
- [ ] Admin sees payment status badge

### Bulk User System
- [ ] Registration form works for new user
- [ ] Login works for existing user
- [ ] Logout works
- [ ] Session persists after refresh
- [ ] Flexible quantity accepted (1, 15, 20, 100 all work)
- [ ] Bulk discount applies at 20+
- [ ] User info pre-fills checkout form

### Contact Form
- [ ] Contact page accessible
- [ ] Form validation works (prevents submit if fields empty)
- [ ] Messages saved
- [ ] Admin can see all messages
- [ ] Admin can view full message
- [ ] Admin can change message status
- [ ] Status updates in list

### Admin Dashboard
- [ ] Contacts tab appears and is functional
- [ ] Orders table shows payment method column
- [ ] Orders table shows payment status column
- [ ] All order details accessible via View button
- [ ] Bulk user list complete
- [ ] Statistics display correct math

### Overall
- [ ] No JavaScript errors (F12 console clear)
- [ ] Notifications appear and disappear
- [ ] Cart persists after refresh
- [ ] Bulk user session persists after refresh
- [ ] All buttons are clickable
- [ ] Modal closes properly
- [ ] Mobile-responsive (test on phone if possible)

---

## 📝 Test Data to Create

### Create These Test Orders:
1. **Retail Cash** - 1 item, cash payment
2. **Retail GCash** - 1 item, GCash payment
3. **Bulk Order <20** - 15 pieces, no discount
4. **Bulk Order ≥20** - 25 pieces, with discount
5. **Bulk Order Large** - 100 pieces

### Create These Contact Messages:
1. **General Inquiry** - Ask about products
2. **Bulk Order Question** - Ask about minimum order
3. **Support Issue** - Report a problem

---

## 💾 Data Location

All data stored in browser LocalStorage:
- Press `F12` → Storage → LocalStorage
- `EASE_orders` - View all orders
- `EASE_bulkUsers` - View all registered users
- `EASE_contacts` - View all contact messages

**To Reset:**
1. Press `F12`
2. Application → Clear storage
3. Refresh page

---

## 🎓 Expected Behavior

### When Retail Customer Checks Out
- [ ] See payment method options
- [ ] If GCash: QR code appears below option
- [ ] Order created after submit
- [ ] Points awarded if applicable

### When Bulk User Orders
- [ ] Quotation shows correct pricing
- [ ] Discount shown for 20+ pieces
- [ ] Order quantity must be ≥ 1
- [ ] Order linked to registered user
- [ ] User audit trail updated

### When Contact Message Submitted
- [ ] Message saved to database
- [ ] Admin can see in Contacts tab
- [ ] Admin can view full detail
- [ ] Admin can update status
- [ ] Status persists

### When Admin Views Orders
- [ ] Can see payment method (Cash/GCash)
- [ ] Can see payment status
- [ ] Can see order audit history
- [ ] Can update status and payment status

---

## ✅ Success Criteria

The system is working correctly if:
1. ✅ Retail customers can checkout with Cash or GCash
2. ✅ GCash QR code generates and displays
3. ✅ Bulk users can register and login
4. ✅ Bulk users can order any quantity with proper pricing
5. ✅ Contact messages are saved and visible to admin
6. ✅ Admin can manage contact message status
7. ✅ Admin can see payment method and status for all orders
8. ✅ No errors in browser console (F12)
9. ✅ All notifications work properly
10. ✅ Data persists in LocalStorage

**If all ✅ pass → Implementation is COMPLETE** 🎉

---

## 🆘 Troubleshooting

**QR Code Not Showing:**
- Check internet connection
- Check browser console for errors
- Try refreshing page

**Can't Find Contacts Tab:**
- Verify admin.html was updated
- Check browser cache (clear it)
- Try incognito/private browsing

**Payment Status Not Showing:**
- Check js/admin.js was updated
- Look for payment-related columns in table
- Verify order has paymentStatus field

**Bulk User Won't Register:**
- Check data.js has registerBulkUser method
- Check email is not already used
- Verify all registration fields are filled

**Contact Message Not Saving:**
- Check js/data.js has addContact method
- Verify form validation passes
- Check LocalStorage in DevTools

---

**Test Status**: Ready to Begin  
**Est. Time**: 30-45 minutes  
**Difficulty**: Beginner-Friendly  
**All Features**: ✨ NEW and WORKING
