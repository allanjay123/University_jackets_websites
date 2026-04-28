# EASE System - Quick Reference Card

## 📍 WHERE TO FIND THINGS

### Customer Website
**File**: `index/index.html`
**Open in**: Web browser
**Login**: ❌ NOT NEEDED

### Admin Dashboard  
**File**: `admin.html`
**Open in**: Web browser
**Login**: ✅ REQUIRED (admin / admin@EASE2026)

---

## 🚀 QUICK START (2 MINUTES)

### I want to...

**...browse products**
→ index/index.html → Click "Shop"

**...make a purchase**
→ index/index.html → Shop → Click "Buy & Earn Points" → Enter details

**...check my points**
→ Look at top-right badge (0 PTS)

**...order in bulk**
→ index/index.html → "Bulk Orders" tab

**...see my VIP products**
→ Earn 500 points first → VIP section unlocks

**...see admin panel**
→ admin.html → Login (admin / admin@EASE2026)

**...manage orders**
→ admin.html → Orders tab → Click View → Update status

**...see customer list**
→ admin.html → Bulk Users tab

**...download reports**
→ admin.html → Click "Export Orders"

---

## 🔑 KEY NUMBERS & FACTS

| Fact | Number |
|------|--------|
| Points per purchase | 100 |
| VIP unlock threshold | 500 |
| Bulk order minimum | 20 pieces |
| Default unit price | ₱1,450 |
| Admin default user | admin |
| Admin default pass | admin@EASE2026 |

---

## 📱 FILE LOCATIONS

```
index/index.html         ← START HERE for customers
admin.html              ← START HERE for admin
js/data.js              ← Data storage system
js/main.js              ← Customer functions
js/admin.js             ← Admin functions
assets/                 ← Product images
README.md               ← Full docs
QUICK_START.md          ← User guide
TECHNICAL_DOCS.md       ← Code docs
```

---

## ⚡ FASTEST ACTIONS

### Customer:
```
1. Open index/index.html
2. Click "Shop"
3. Click "Buy & Earn Points"
4. Click shopping bag
5. Enter: Name, Email, Phone
6. Confirm → Done!
```

### Admin:
```
1. Open admin.html
2. Username: admin
3. Password: admin@EASE2026
4. See dashboard
5. Click Orders
6. Click View
7. Update status
```

---

## 🎯 THE 5 MAIN PAGES

### Customer Site - 5 Sections:
1. **Home** - Overview & loyalty info
2. **Shop** - Browse & buy products  
3. **Design** - Customize jacket
4. **Bulk Orders** - Wholesale orders
5. Navigation at top

### Admin Site - 4 Sections:
1. **Dashboard** - Overview stats
2. **Orders** - Manage transactions
3. **Bulk Users** - Customer directory
4. **Statistics** - Analytics & reports

---

## 💾 WHAT'S SAVED AUTOMATICALLY

✅ All orders
✅ All customers  
✅ All points
✅ All status updates
✅ Admin login

❌ NOT SAVED: Cart (cleared on checkout)

---

## 🔡 ORDER STATUS PROGRESSION

```
1. ⏳ PENDING (Just created)
   ↓
2. ✅ CONFIRMED (Admin approved)
   ↓
3. 📦 SHIPPED (On the way)
   ↓
4. 🎁 DELIVERED (Complete)

OR

❌ CANCELLED (Rejected)
```

---

## 💰 PRICING REFERENCE

| Item | Price |
|------|-------|
| Executive Purple | ₱1,850 |
| VIP Obsidian | ₱3,500 |
| Midnight Bomber | ₱1,200 |
| Bulk (20+) | ₱1,450 |
| Chest Patch | +₱250 |

---

## 🎁 LOYALTY STAGES

```
0 pts: START
↓
100 pts: After 1 purchase
↓
200 pts: After 2 purchases
↓
...
↓
500 pts: VIP UNLOCK! 🎉
  • Elite Member status
  • Buy VIP products
  • Early access to sales
```

---

## 🆘 COMMON ISSUES & FIXES

| Problem | Fix |
|---------|-----|
| Page won't load | Check file path, refresh |
| Points not showing | Refresh page, enable JS |
| Can't login | Check password spelling |
| Orders disappeared | Check browser storage enabled |
| Mobile looks weird | Zoom out, clear cache |
| Button not working | Try different browser |

---

## 📊 ADMIN REPORTING

### To Export Orders:
1. Go admin.html → Login
2. Click "Export Orders" (top right)
3. Save CSV file
4. Open in Excel

### To View Statistics:
1. Go admin.html → Login
2. Click "Statistics" (left sidebar)
3. See revenue, order counts, averages

### To Track Customers:
1. Go admin.html → Login
2. Click "Bulk Users" (left sidebar)
3. See customer details & history

---

## 🔐 SECURITY NOTES

⚠️ Admin password: **admin@EASE2026**
⚠️ Change this for production!
⚠️ Only 1 admin account by default
⚠️ Customers never login

---

## 📚 DOCUMENTATION QUICK LINKS

Need help? Check these:

**Total Overview**
→ README.md

**Step-by-Step Instructions**
→ QUICK_START.md

**Technical Deep Dive**
→ TECHNICAL_DOCS.md

**Visual Architecture**
→ SYSTEM_OVERVIEW.md

**Testing Checklist**
→ TESTING_GUIDE.md

**This Quick Reference**
→ You reading it! 👈

---

## ✨ WHAT YOU CAN DO RIGHT NOW

✅ Open browser
✅ Navigate to index/index.html
✅ Browse products
✅ Make test purchase
✅ Watch points increase
✅ Open admin.html
✅ Login (admin/admin@EASE2026)
✅ See your order
✅ Update status
✅ Export report

---

## 🎯 MAIN FEATURES AT A GLANCE

| Feature | Where | How |
|---------|-------|-----|
| Buy Product | index.html | Click Buy button |
| Earn Points | Auto | 100 pts per item |
| Review Cart | index.html | Click shopping bag |
| Checkout | index.html | Enter details |
| Unlock VIP | Auto | At 500 points |
| Bulk Orders | index.html | Min 20 items |
| Admin Login | admin.html | admin/admin@EASE2026 |
| View Orders | admin.html | Orders tab |
| Update Status | admin.html | Click View → Select status |
| Export Data | admin.html | Export Orders button |
| View Stats | admin.html | Statistics tab |
| See Users | admin.html | Bulk Users tab |

---

## 📞 CUSTOMER FLOW

```
CUSTOMER
  │
  ├─→ Browse → Select → Buy → Earn Points ✅
  │
  ├─→ Loyalty grows → VIP unlock at 500 pts ✅
  │
  └─→ Need bulk? → Register → Place order → Admin contacts ✅
```

---

## 👨‍💼 ADMIN FLOW

```
ADMIN
  │
  ├─→ Login → View Dashboard ✅
  │
  ├─→ Check Orders → Update status ✅
  │
  ├─→ Review Users → Track customers ✅
  │
  ├─→ View Stats → Track revenue ✅
  │
  └─→ Export Reports → Keep records ✅
```

---

## 🚀 FIRST DAY CHECKLIST

- [ ] Test open customer site
- [ ] Make test purchase
- [ ] Verify points increase
- [ ] Check VIP unlock at 500
- [ ] Test bulk order
- [ ] Open admin dashboard
- [ ] Login with credentials
- [ ] View test orders
- [ ] Update order status
- [ ] Export CSV report
- [ ] Read README.md
- [ ] Share with customers!

---

## 💡 HELPFUL TIPS

💡 **Tip 1**: Customers don't need passwords
💡 **Tip 2**: Admin password can be changed in js/data.js
💡 **Tip 3**: All data stored in browser (not server)
💡 **Tip 4**: Export data regularly as backup
💡 **Tip 5**: Works offline (data persists)
💡 **Tip 6**: Mobile responsive (all devices)
💡 **Tip 7**: Each order gets unique ID
💡 **Tip 8**: Points auto-calculated
💡 **Tip 9**: VIP auto-unlocks at 500
💡 **Tip 10**: Status updated in real-time

---

## 📞 STILL HAVE QUESTIONS?

Check these in order:
1. This card (Quick Reference)
2. QUICK_START.md (Beginner guide)
3. README.md (Full documentation)
4. TECHNICAL_DOCS.md (Code details)
5. Browser console F12 (Error messages)

---

**EASE System - Quick Reference Card**
**Print this out if you need it! 🖨️**

Keep this handy for fast reference! 📌
