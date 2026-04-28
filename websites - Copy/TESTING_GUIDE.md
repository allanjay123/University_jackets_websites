# EASE System - Testing & Verification Guide

## 🧪 Complete Testing Instructions

Follow this guide to verify everything works correctly.

---

## 📋 PRE-TEST CHECKLIST

Before starting:
- [ ] Browser with F12 developer console access
- [ ] Internet connection (for fonts/icons)
- [ ] All files created successfully
- [ ] About 10-15 minutes free time

---

## 🔍 PART 1: CUSTOMER WEBSITE TEST

### Step 1: Open the Website
1. Navigate to: `index/index.html`
2. You should see:
   - EASE logo at top
   - Navigation menu
   - Purple/gold color scheme
   - Hero section with "WEAR YOUR PRIDE"
   - Loyalty rewards section

✅ **Expected Result**: Website loads beautifully with all styling

---

### Step 2: Test Loyalty Display
1. Look at top-right corner
2. You should see badge: `0 PTS`
3. In the loyalty section, see: `0` points displayed
4. Tier should show: `STANDARD MEMBER`

✅ **Expected Result**: Points display initialized to 0

---

### Step 3: Test Product Purchase  
1. Scroll down to SHOP section
2. Click **"Shop Collection"** button
3. See 3 products with images:
   - Executive Purple Varsity
   - VIP Obsidian Edition (should be grayed out)
   - Midnight Bomber

✅ **Expected Result**: All products visible, VIP locked

---

### Step 4: Test Buying First Item
1. On "Executive Purple Varsity" card
2. Click **"Buy & Earn Points"** button
3. You should see notification: "Added Executive Purple to cart..."

✅ **Expected Result**: Alert shows purchase notification

---

### Step 5: Check Points Updated
1. Look at top-right badge
2. Should now show: `100 PTS`
3. In loyalty section below, should show: `100`
4. Tier should still be: `STANDARD MEMBER`

✅ **Expected Result**: Points increased by 100

---

### Step 6: Buy More Items
1. Click "Buy & Earn Points" button again on same item
2. Points should increase to: `200 PTS`
3. Try buying "Midnight Bomber"
4. Points should increase to: `300 PTS`

✅ **Expected Result**: Each purchase adds 100 points

---

### Step 7: Verify VIP is Locked
1. Look at "VIP Obsidian Edition" card
2. Should still be grayed out with "LOCKED" badge
3. Button should say: "Loyal Customers Only"

✅ **Expected Result**: VIP content remains locked

---

### Step 8: Unlock VIP (Buy 2 More Items)
1. Return to Executive Purple product
2. Click "Buy & Earn Points" twice more
3. Total points should reach: `500 PTS`
4. Immediately check VIP card...

✅ **Expected Result**: VIP Card should now be:
- Colorful (not grayed)
- Badge: "VIP UNLOCKED"
- Button: "Buy VIP Design"
- Lock message in green

---

### Step 9: Check Tier Updated
1. Look at "ELITE MEMBER" badge
2. Should now have gold background
3. Tier dropdown should show different style

✅ **Expected Result**: User promoted to ELITE status

---

### Step 10: Test Shopping Cart Checkout
1. Click shopping bag icon (top right)
2. Alert shows your cart items and points
3. Click OK to proceed

✅ **Expected Result**: Cart summary displays correctly

---

### Step 11: Test Checkout Flow
1. When prompted for name, enter: **"John Doe"**
2. When prompted for phone, enter: **"09123456789"**
3. When prompted for email, enter: **"john@test.com"**
4. See confirmation message with Order ID

✅ **Expected Result**: Order submitted successfully with Order ID

---

### Step 12: Test Design Studio
1. Go to "Design" tab (or "DESIGN STUDIO" link)
2. See jacket preview on left
3. See customization panel on right
4. Try changing color in dropdown
5. Try toggle checkbox for chest patch

✅ **Expected Result**: Preview updates in real-time

---

### Step 13: Test Bulk Orders
1. Go to "Bulk Orders" tab
2. See form with:
   - Quantity input (showing "Min. 20")
   - Location dropdown
   - "Get Quotation" button
3. Enter quantity: **50**
4. Select location: **Cabagan**
5. Click "Get Quotation"

✅ **Expected Result**: Shows quotation with discount calculated

---

### Step 14: Test Bulk Registration Modal
1. At quotation result, click "Register & Place Order"
2. Modal appears with form
3. Enter test data:
   - Email: john@bulk.com
   - Name: John's Catering
   - Phone: 09999999999
4. Click "Complete Registration"

✅ **Expected Result**: Order submitted, confirmation message shown

---

### Step 15: Mobile Responsiveness Test
1. Press F12 to open developer tools
2. Click device toggle (responsive mode)
3. Select mobile phone size
4. Navigate through all pages
5. Check all buttons are clickable
6. Verify layout looks good

✅ **Expected Result**: All features work on mobile size

---

## 👨‍💼 PART 2: ADMIN DASHBOARD TEST

### Step 1: Open Admin Dashboard
1. Navigate to: `admin.html`
2. You should see login screen with:
   - EASE title
   - Username and password inputs
   - Login button
   - Default credentials shown

✅ **Expected Result**: Login page displays correctly

---

### Step 2: Try Wrong Login
1. Enter username: `wrong`
2. Enter password: `wrong`
3. Click Login
4. Should see alert: "Invalid credentials"

✅ **Expected Result**: Wrong credentials rejected

---

### Step 3: Login with Correct Credentials
1. Clear fields
2. Enter username: `admin`
3. Enter password: `admin@EASE2026`
4. Click Login

✅ **Expected Result**: Dashboard appears

---

### Step 4: Check Dashboard Overview
1. You should see statistics:
   - Total Orders (should show number from your tests)
   - Total Revenue (should show amounts)
   - Pending Orders
   - Bulk Users
2. Each stat shows in a card

✅ **Expected Result**: All statistics display with your test data

---

### Step 5: Test Orders Tab
1. At top sidebar, click "Orders" button
2. See table with all orders you created:
   - Column headers: Order ID, Customer, Type, Amount, Qty, Status, Date, Action
   - Your retail order showing
   - Your bulk order showing
   - Type shows emoji (🛍️ or 📦)

✅ **Expected Result**: All created orders appear in table

---

### Step 6: Test Order View Modal
1. Click "View" button on any order
2. Modal opens showing:
   - Order ID
   - Customer information
   - Order details
   - Items ordered (with products, qty, prices)
   - Total amount in highlighted box
   - Status dropdown
   - "Update Status" button

✅ **Expected Result**: Complete order details display

---

### Step 7: Test Status Update
1. In modal, select new status: **"Confirmed"**
2. Click "Update Status"
3. See success message
4. Modal closes
5. Return to Orders tab

✅ **Expected Result**: Status updated and visible in table

---

### Step 8: Verify Status Changed
1. Look at the order you just updated
2. Status column should show: **"CONFIRMED"**
3. Status badge color changed accordingly

✅ **Expected Result**: Status change persisted

---

### Step 9: Test Bulk Users Tab
1. Click "Bulk Users" button on sidebar
2. See table with your registered bulk users:
   - Name, Email, Phone, Location, Registered, Orders, Points
   - Your bulk test user appears
   - Shows registration date
   - Shows number of orders
   - Shows loyalty points

✅ **Expected Result**: User database displays correctly

---

### Step 10: Test Statistics Tab
1. Click "Statistics" button on sidebar
2. See detailed stats:
   - Total Revenue (large card)
   - Total Orders
   - Retail Orders (count)
   - Bulk Orders (count)
   - Average Order Value
   - Bulk Users
   - Total Points

✅ **Expected Result**: Complete analytics display

---

### Step 11: Test Export CSV
1. At top right, click "Export Orders" button
2. CSV file starts downloading
3. File name: `EASE_Orders_[date].csv`
4. Open downloaded file in Excel or text editor
5. Should contain:
   - Headers: Order ID, Customer, Type, Phone, Email, Amount, Quantity, Status, Date
   - Your test orders as rows

✅ **Expected Result**: CSV exports successfully with all data

---

### Step 12: Test Tab Switching
1. Click between Dashboard, Orders, Users, Statistics
2. Each tab remembers its content
3. Dashboard updates stats when you switch back

✅ **Expected Result**: All tabs load correctly and independently

---

### Step 13: Test Session Persistence
1. Note a random order ID (e.g., ORD-1234567890)
2. Close the browser tab
3. Reopen admin.html
4. Notice you're still logged in automatically
5. Check if your order data still appears

✅ **Expected Result**: Session and data persist

---

### Step 14: Test Manual Logout
1. Click "Logout" button (red button, top right)
2. Confirm logout
3. Should return to login screen

✅ **Expected Result**: Successfully logged out

---

### Step 15: Verify Login Required Again
1. Try to access browser history
2. Manually go back to admin.html
3. Should see login screen again (not dashboard)

✅ **Expected Result**: Login requirement enforced

---

## 🔗 PART 3: DATA PERSISTENCE TEST

### Step 1: Create Test Scenario
1. Open customer site (index.html)
2. Make 3 purchases (300 points)
3. Go to Bulk Orders
4. Submit a bulk order with registration
5. Note the Order IDs

✅ **Expected Result**: All data created

---

### Step 2: Open Admin and Verify
1. Open admin.html
2. Login
3. Check all your orders appear
4. Check bulk user appears

✅ **Expected Result**: Data visible in admin

---

### Step 3: Clear Browser Cache Test
1. Open Developer Tools (F12)
2. Right-click on page → "Empty Cache and Hard Reload"
3. Or use Ctrl+Shift+Delete to clear cache
4. Return to customer site

✅ **Question**: Does data still appear?
✅ **Expected Result**: Points and cart should reset (design choice)

---

### Step 4: Full Browser Restart Test
1. Close all browser windows
2. Restart browser
3. Open customer site (index.html)
4. Check if points persist
5. Open admin.html
6. Check if orders persist

✅ **Expected Result**: Orders persist, points might reset (by design)

---

## ✨ PART 4: VISUAL & UX TEST

### Test Navigation
- [ ] All nav links work
- [ ] Logo clickable
- [ ] Tab switching smooth
- [ ] No broken images
- [ ] Styling consistent

### Test Forms
- [ ] Input fields work
- [ ] Dropdowns functional
- [ ] Buttons clickable
- [ ] Modals display properly
- [ ] Validation works

### Test Designs
- [ ] Colors consistent
- [ ] Typography readable
- [ ] Spacing appropriate
- [ ] Icons display correctly
- [ ] Animations smooth

### Test Responsiveness
- [ ] Desktop view perfect
- [ ] Tablet view good
- [ ] Mobile view responsive
- [ ] No horizontal scroll
- [ ] Touch targets large enough

---

## 🐛 PART 5: BROWSER CONSOLE CHECK

### Check for Errors:
1. Press F12 to open Developer Tools
2. Click "Console" tab
3. Look for red error messages
4. Note any warnings

**Expected**: Should be clean or only warnings about missing images

---

## 📊 COMPLETE TEST RESULTS CHECKLIST

### Customer Site ✅
- [ ] Website loads
- [ ] Points start at 0
- [ ] Can buy items
- [ ] Points increase
- [ ] VIP unlocks at 500
- [ ] Checkout works
- [ ] Design studio works
- [ ] Bulk order form works
- [ ] Bulk registration works

### Admin Dashboard ✅
- [ ] Login works
- [ ] Dashboard loads
- [ ] Orders display
- [ ] Users display
- [ ] Statistics display
- [ ] Can view order details
- [ ] Can update status
- [ ] Can export CSV
- [ ] Can logout
- [ ] Mobile responsive

### Data Persistence ✅
- [ ] Orders saved
- [ ] Users saved
- [ ] Status changes saved
- [ ] Points calculated
- [ ] Data readable after reload

### Visual & UX ✅
- [ ] Beautiful design
- [ ] Consistent colors
- [ ] Smooth animations
- [ ] Clear navigation
- [ ] Mobile friendly

---

## 🎯 SUMMARY

If all tests above pass ✅, then:

✅ **System is working perfectly!**
✅ **Ready for production use**
✅ **All features functional**
✅ **Data persisting correctly**
✅ **Admin accessible**
✅ **Mobile responsive**

Congratulations! 🎉

---

## 🚨 IF SOMETHING FAILS

### Issue: Page won't load
**Solution**: Check file paths are correct, use absolute paths

### Issue: Points not increasing
**Solution**: Check js/main.js is linked, check browser console for errors

### Issue: Admin won't login
**Solution**: Check username/password exactly (case-sensitive), clear cache

### Issue: Orders not appearing
**Solution**: Check that orders data.js is loading, check browser storage is enabled

### Issue: Mobile looks broken
**Solution**: Zoom out browser view, clear cache, try different browser

### Issue: CSV won't download
**Solution**: Check if pop-ups blocked, try different browser, check export button

---

## 📞 NEED HELP?

Check these files:
1. README.md - Full documentation
2. QUICK_START.md - User guide
3. TECHNICAL_DOCS.md - Code details
4. Browser console (F12) - Error messages

---

**EASE System Testing - Complete Guide v1.0**

Good luck! 🚀
