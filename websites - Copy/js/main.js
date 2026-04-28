// EASE Main Website JavaScript - Complete Version with Payment & Bulk User Login

let userPoints = 0;
let cart = [];
let currentBulkUser = null;
let currentPage = 'home';

// QR Code for GCash (static example - replace with your actual GCash QR)
const GCASH_QR = 'https://via.placeholder.com/300?text=GCash+QR+Code';

// Main initialization happens at bottom of file in comprehensive DOMContentLoaded

// Load user data if they're logged in
function loadUserData() {
    const savedUser = localStorage.getItem('EASE_currentUser');
    if (savedUser) {
        currentBulkUser = JSON.parse(savedUser);
    }
}

// Check if bulk user is logged in
function checkBulkUserLogin() {
    const savedBulkUser = dataManager.getCurrentBulkUser();
    if (savedBulkUser) {
        currentBulkUser = savedBulkUser;
        updateBulkUserUI();
    }
}

// Update UI for bulk user
function updateBulkUserUI() {
    const userDisplay = document.getElementById('bulk-user-display');
    if (userDisplay && currentBulkUser) {
        userDisplay.innerHTML = `<span style="color: #4a148c; font-weight: 600;">👤 ${currentBulkUser.fullName}</span>`;
    }
}

// Update bulk user dashboard info
function updateBulkUserDashboard() {
    if (!currentBulkUser) return;
    
    const welcomeEl = document.getElementById('bulk-user-welcome');
    const nameEl = document.getElementById('bulk-user-name');
    const ordersEl = document.getElementById('bulk-user-orders');
    const pointsEl = document.getElementById('bulk-user-points');

    if (welcomeEl) welcomeEl.textContent = currentBulkUser.fullName;
    if (nameEl) nameEl.textContent = `📧 ${currentBulkUser.email}`;
    if (ordersEl) ordersEl.textContent = currentBulkUser.totalOrders || 0;
    if (pointsEl) pointsEl.textContent = currentBulkUser.totalPoints || 0;
}

// Show page function
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    
    const pageElement = document.getElementById(pageId);
    if (pageElement) {
        pageElement.classList.add('active-page');
    }
    
    if (document.getElementById('nav-' + pageId)) {
        document.getElementById('nav-' + pageId).classList.add('active');
    }
    
    currentPage = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== SHOPPING FUNCTIONS ==========

// Add item to cart
function addToCart(name, price, quantity = 1, barangay = null, purok = null) {
    const item = {
        id: Date.now(),
        name: name,
        price: price,
        quantity: quantity,
        barangay: barangay,
        purok: purok,
        points: 100 * quantity
    };
    cart.push(item);
    updatePointsDisplay();
    showNotification(`✅ ${name} added to cart! (${quantity}x)${barangay ? ' [' + barangay : ''}${purok ? ', ' + purok + ']' : ']'}`);
}

// Keep buyItem for backward compatibility
function buyItem(name, price, quantity = 1) {
    addToCart(name, price, quantity);
    userPoints += 100 * quantity;
    updatePointsDisplay();
}

// Update points display
function updatePointsDisplay() {
    document.getElementById('pts-display').innerText = userPoints + ' PTS';
    document.getElementById('points-val').innerText = userPoints;

    // Unlock VIP content at 500 points
    if (userPoints >= 500) {
        unlockVIPContent();
    }
}

// Unlock VIP content
function unlockVIPContent() {
    const card = document.getElementById('limited-card');
    if (!card) return;

    const tag = document.getElementById('vip-tag');
    const msg = document.getElementById('lock-msg');
    const btn = document.getElementById('lock-btn');

    if (card.style.opacity !== '1') {
        card.style.opacity = '1';
        card.style.filter = 'grayscale(0)';
        tag.innerText = 'VIP UNLOCKED';
        tag.style.background = '#ffc107';
        tag.style.color = '#000';
        msg.innerText = 'Exclusive access granted!';
        msg.style.color = 'green';
        btn.disabled = false;
        btn.style.background = '#4a148c';
        btn.style.color = 'white';
        btn.style.cursor = 'pointer';
        btn.innerText = 'Buy VIP Design';
        btn.onclick = function() { buyItem('VIP Obsidian Edition', 3500); };
        
        document.getElementById('user-tier').innerText = 'ELITE MEMBER';
        document.getElementById('user-tier').style.background = '#ffc107';
        document.getElementById('user-tier').style.color = '#000';
    }
}

// ========== LOYALTY & REWARDS SYSTEM ==========

// Calculate loyalty tier based on points
function getLoyaltyTier(points) {
    if (points >= 5000) return { name: 'PLATINUM MEMBER', color: '#e0e0e0', discount: '20%', points };
    if (points >= 2500) return { name: 'GOLD MEMBER', color: '#ffc107', discount: '15%', points };
    if (points >= 1000) return { name: 'SILVER MEMBER', color: '#c0c0c0', discount: '10%', points };
    if (points >= 500) return { name: 'BRONZE MEMBER', color: '#cd7f32', discount: '5%', points };
    return { name: 'STANDARD MEMBER', color: '#999', discount: '0%', points };
}

// Get loyalty benefits display
function showLoyaltyBenefits() {
    const tier = getLoyaltyTier(userPoints);
    const modContent = `
    <div style="background: white; padding: 40px; border-radius: 20px; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 30px;">
            <div style="background: linear-gradient(135deg, ${tier.color}, ${tier.color}80); color: #fff; padding: 30px; border-radius: 20px; margin-bottom: 20px;">
                <i class="fas fa-crown" style="font-size: 40px; margin-bottom: 15px; display: block;"></i>
                <h2 style="margin: 0; font-size: 28px;">${tier.name}</h2>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">You have <strong>${userPoints}</strong> points</p>
            </div>
        </div>

        <h3>Your Member Benefits:</h3>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 15px; margin-bottom: 20px;">
            <p style="margin: 10px 0;"><i class="fas fa-tag" style="color: #4a148c;"></i> <strong>Discount: ${tier.discount} OFF</strong></p>
            <p style="margin: 10px 0;"><i class="fas fa-shipping-fast" style="color: #4a148c;"></i> <strong>Free Shipping</strong> (orders ≥₱3000)</p>
            <p style="margin: 10px 0;"><i class="fas fa-gift" style="color: #4a148c;"></i> <strong>Exclusive Access</strong> to limited designs</p>
            <p style="margin: 10px 0;"><i class="fas fa-calendar" style="color: #4a148c;"></i> <strong>Early Access</strong> to new releases</p>
        </div>

        <h3>Point Tiers:</h3>
        <div style="background: #f0f7ff; padding: 15px; border-radius: 12px; margin-bottom: 20px; font-size: 13px;">
            <p style="margin: 8px 0;"><span style="color: #999;">⭐</span> 500+ pts → <strong>BRONZE</strong> (5% off)</p>
            <p style="margin: 8px 0;"><span style="color: #c0c0c0;">⭐⭐</span> 1000+ pts → <strong>SILVER</strong> (10% off)</p>
            <p style="margin: 8px 0;"><span style="color: #ffc107;">⭐⭐⭐</span> 2500+ pts → <strong>GOLD</strong> (15% off)</p>
            <p style="margin: 8px 0;"><span style="color: #e0e0e0;">⭐⭐⭐⭐</span> 5000+ pts → <strong>PLATINUM</strong> (20% off)</p>
        </div>

        <h3>How to Earn Points:</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
            <div style="background: #e8f5e9; padding: 15px; border-radius: 12px; text-align: center;">
                <p style="margin: 0; font-size: 12px; color: #2e7d32;"><strong>100 PTS per purchase</strong></p>
            </div>
            <div style="background: #fff3e0; padding: 15px; border-radius: 12px; text-align: center;">
                <p style="margin: 0; font-size: 12px; color: #f57c00;"><strong>Bulk orders = 2x points</strong></p>
            </div>
            <div style="background: #e3f2fd; padding: 15px; border-radius: 12px; text-align: center;">
                <p style="margin: 0; font-size: 12px; color: #1565c0;"><strong>Referral bonus</strong></p>
            </div>
            <div style="background: #fce4ec; padding: 15px; border-radius: 12px; text-align: center;">
                <p style="margin: 0; font-size: 12px; color: #c2185b;"><strong>Birthday bonus</strong></p>
            </div>
        </div>

        <h3>Redeem Points:</h3>
        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
            <button class="btn btn-primary" style="flex: 1; padding: 12px;" onclick="redeemPoints(500)">Redeem 500 pts</button>
            <button class="btn btn-primary" style="flex: 1; padding: 12px;" onclick="redeemPoints(1000)">Redeem 1000 pts</button>
        </div>

        <button class="btn btn-outline" style="width: 100%;" onclick="closeModal()">Close</button>
    </div>
    `;
    showModalContent('Loyalty & Rewards', modContent);
}

// Redeem points for discount
function redeemPoints(amount) {
    if (userPoints < amount) {
        showNotification(`❌ Not enough points. You have ${userPoints} points.`);
        return;
    }

    const discountAmount = (amount / 100) * 50; // 50 pesos per 100 points
    userPoints -= amount;
    updatePointsDisplay();
    showNotification(`✅ Redeemed ${amount} points!\nDiscount: ₱${discountAmount}\nNew Balance: ${userPoints} pts`);
    savePointsToLocalStorage();
    closeModal();
}

// Save points to localStorage
function savePointsToLocalStorage() {
    localStorage.setItem('EASE_userPoints', JSON.stringify(userPoints));
}

// Load points from localStorage
function loadPointsFromLocalStorage() {
    const saved = localStorage.getItem('EASE_userPoints');
    if (saved) {
        userPoints = JSON.parse(saved);
        updatePointsDisplay();
    }
}

// Track purchase rewards
function trackPurchaseRewards(orderData) {
    const points = orderData.quantity * 100;
    userPoints += points;
    updatePointsDisplay();
    savePointsToLocalStorage();
    
    // Show reward notification
    const tier = getLoyaltyTier(userPoints);
    showNotification(`✅ Order placed!\n+${points} reward points!\nYour tier: ${tier.name}`);
}

// Update product details sidebar
function updateDetails(name, price, desc) {
    document.getElementById('details-content').style.display = 'none';
    document.getElementById('full-info').style.display = 'block';
    document.getElementById('det-name').innerText = name;
    document.getElementById('det-price').innerText = '₱' + price;
    document.getElementById('det-desc').innerText = desc;
}

// Customizer functions
function togglePatch() {
    const p = document.getElementById('patch1');
    p.style.display = (p.style.display === 'block') ? 'none' : 'block';
}

function changeColor(c) {
    document.getElementById('jacket-preview').style.background = c;
}

// Cart functions with new payment system
function toggleCart() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    showCheckoutView();
}

// Show checkout view with all items
function showCheckoutView() {
    let cartHTML = '<div style="background: white; padding: 30px; border-radius: 20px; max-width: 600px; margin: 0 auto;">';
    cartHTML += '<h2 style="color: #4a148c; margin-bottom: 20px;">🛒 Your Shopping Cart</h2>';
    cartHTML += '<div style="border-bottom: 2px solid #eee; margin-bottom: 20px; padding-bottom: 20px;">';
    
    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartHTML += `
        <div style="display: flex; justify-content: space-between; margin-bottom: 12px; padding: 10px; background: #f9f9f9; border-radius: 8px;">
            <div style="flex: 1;">
                <strong>${item.name}</strong><br>
                <small style="opacity: 0.6;">${item.quantity}x ₱${item.price.toLocaleString()}</small>
            </div>
            <div style="text-align: right;">
                <strong style="color: #4a148c;">₱${itemTotal.toLocaleString()}</strong><br>
                <button class="btn-small" onclick="removeFromCart(${index})" style="padding: 4px 8px; font-size: 10px; background: #f44336;">Remove</button>
            </div>
        </div>`;
    });
    
    cartHTML += '</div>';
    cartHTML += `<h3 style="text-align: right; color: #4a148c; margin-bottom: 20px; font-size: 24px;">Total: ₱${total.toLocaleString()}</h3>`;
    cartHTML += `<button class="btn btn-primary" style="width: 100%; margin-bottom: 10px;" onclick="proceedToCheckout()">Proceed to Checkout</button>`;
    cartHTML += `<button class="btn btn-outline" style="width: 100%;" onclick="continueShopping()">Continue Shopping</button>`;
    cartHTML += '</div>';
    
    // Show in modal
    showModalContent('Cart', cartHTML);
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    if (cart.length === 0) {
        closeModal();
        showNotification('Cart emptied!');
    } else {
        showCheckoutView();
    }
}

function continueShopping() {
    closeModal();
    showPage('shop');
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Cart is empty!');
        return;
    }

    if (currentBulkUser) {
        // Bulk user checkout
        showBulkCheckout();
    } else {
        // Retail customer checkout
        showRetailCheckout();
    }
}

// Show retail checkout with payment options
function showRetailCheckout() {
    let checkoutHTML = '<div style="background: white; padding: 30px; border-radius: 20px; max-width: 600px; margin: 0 auto;">';
    checkoutHTML += '<h2 style="color: #4a148c; margin-bottom: 20px;">📦 Order Details</h2>';
    
    // Cart summary
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    
    checkoutHTML += '<div style="background: #f9f9f9; padding: 15px; border-radius: 10px; margin-bottom: 20px;">';
    checkoutHTML += '<h4 style="margin-bottom: 10px;">Cart Items:</h4>';
    cart.forEach(item => {
        checkoutHTML += `<div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span>${item.quantity}x ${item.name}</span>
            <strong>₱${(item.price * item.quantity).toLocaleString()}</strong>
        </div>`;
    });
    checkoutHTML += `<div style="border-top: 1px solid #ddd; margin-top: 10px; padding-top: 10px;">
        <strong style="font-size: 16px;">Total: ₱${total.toLocaleString()}</strong>
    </div></div>`;
    
    // Customer info form
    checkoutHTML += '<h4 style="margin-bottom: 15px;">Your Information:</h4>';
    checkoutHTML += '<input type="text" id="checkout-name" placeholder="Full Name" style="width: 100%; padding: 12px; margin-bottom: 12px; border-radius: 10px; border: 1px solid #ddd;">';
    checkoutHTML += '<input type="email" id="checkout-email" placeholder="Email Address" style="width: 100%; padding: 12px; margin-bottom: 12px; border-radius: 10px; border: 1px solid #ddd;">';
    checkoutHTML += '<input type="tel" id="checkout-phone" placeholder="Phone Number" style="width: 100%; padding: 12px; margin-bottom: 20px; border-radius: 10px; border: 1px solid #ddd;">';
    
    // Payment method
    checkoutHTML += '<h4 style="margin-bottom: 15px;">Payment Method:</h4>';
    checkoutHTML += '<div style="display: flex; gap: 15px; margin-bottom: 20px;">';
    checkoutHTML += '<label style="flex: 1; padding: 15px; border: 2px solid #ddd; border-radius: 10px; cursor: pointer; text-align: center;">';
    checkoutHTML += '<input type="radio" name="payment_method" value="cash" checked> 💵 Cash on Delivery';
    checkoutHTML += '</label>';
    checkoutHTML += '<label style="flex: 1; padding: 15px; border: 2px solid #ddd; border-radius: 10px; cursor: pointer; text-align: center;">';
    checkoutHTML += '<input type="radio" name="payment_method" value="gcash" onchange="showGCashInfo()"> 📱 GCash Payment';
    checkoutHTML += '</label>';
    checkoutHTML += '</div>';
    
    // GCash info (hidden by default)
    checkoutHTML += '<div id="gcash-section" style="display: none; background: #fff3e0; padding: 15px; border-radius: 10px; margin-bottom: 20px;">';
    checkoutHTML += '<p style="margin-bottom: 10px;"><strong>GCash Payment Instructions:</strong></p>';
    checkoutHTML += '<p style="font-size: 12px; margin-bottom: 10px;">Scan the GCash QR Code below or send payment to: <strong>09xx-xxx-xxxx</strong></p>';
    checkoutHTML += '<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=gcash-payment-EASE" style="width: 200px; height: 200px; margin: 10px 0; border-radius: 10px;">';
    checkoutHTML += '<p style="font-size: 12px; color: red;">⚠️ Note: Include your phone number in the transaction reference.</p>';
    checkoutHTML += '</div>';
    
    checkoutHTML += '<button class="btn btn-primary" style="width: 100%; margin-bottom: 10px;" onclick="submitRetailOrder('+total+')">Complete Order</button>';
    checkoutHTML += '<button class="btn btn-outline" style="width: 100%;" onclick="closeModal()">Cancel</button>';
    checkoutHTML += '</div>';
    
    showModalContent('Checkout', checkoutHTML);
}

// Show GCash info
function showGCashInfo() {
    const gcashSection = document.getElementById('gcash-section');
    if (gcashSection) {
        gcashSection.style.display = 'block';
    }
}

// Submit retail order
function submitRetailOrder(total) {
    const name = document.getElementById('checkout-name').value;
    const email = document.getElementById('checkout-email').value;
    const phone = document.getElementById('checkout-phone').value;
    const paymentMethod = document.querySelector('input[name="payment_method"]:checked').value;

    if (!name || !email || !phone) {
        showNotification('❌ Please fill in all fields');
        return;
    }

    const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const points = 100 * cart.length;

    const orderData = {
        type: 'retail',
        customerName: name,
        phone: phone,
        email: email,
        items: cart,
        total: total,
        points: points,
        quantity: quantity,
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === 'cash' ? 'pending' : 'awaiting'
    };

    const order = dataManager.addOrder(orderData);
    
    // Add points to user loyalty account
    userPoints += points;
    savePointsToLocalStorage();
    updatePointsDisplay();
    
    showNotification(`✅ Order #${order.id} submitted successfully!\n\nPayment: ${paymentMethod === 'cash' ? 'Cash on Delivery' : 'GCash'}\nYou earned ${points} reward points!\nTotal Points: ${userPoints}`);
    
    cart = [];
    updateCartBadge();
    closeModal();
    showPage('home');
}

// Show bulk user checkout
function showBulkCheckout() {
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    let checkoutHTML = '<div style="background: white; padding: 30px; border-radius: 20px; max-width: 600px; margin: 0 auto;">';
    checkoutHTML += `<h2 style="color: #4a148c; margin-bottom: 10px;">👤 ${currentBulkUser.fullName}</h2>`;
    checkoutHTML += '<p style="opacity: 0.6; margin-bottom: 20px;">Signed in as bulk user</p>';
    
    // Cart summary
    checkoutHTML += '<div style="background: #f9f9f9; padding: 15px; border-radius: 10px; margin-bottom: 20px;">';
    checkoutHTML += '<h4 style="margin-bottom: 10px;">Order Items:</h4>';
    cart.forEach(item => {
        checkoutHTML += `<div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span>${item.quantity}x ${item.name}</span>
            <strong>₱${(item.price * item.quantity).toLocaleString()}</strong>
        </div>`;
    });
    checkoutHTML += `<div style="border-top: 1px solid #ddd; margin-top: 10px; padding-top: 10px;">
        <strong style="font-size: 16px;">Total: ₱${total.toLocaleString()}</strong>
    </div></div>`;
    
    // Payment method
    checkoutHTML += '<h4 style="margin-bottom: 15px;">Payment Method:</h4>';
    checkoutHTML += '<div style="display: flex; gap: 15px; margin-bottom: 20px;">';
    checkoutHTML += '<label style="flex: 1; padding: 15px; border: 2px solid #ddd; border-radius: 10px; cursor: pointer; text-align: center;">';
    checkoutHTML += '<input type="radio" name="bulk_payment" value="cash" checked> 💵 Cash on Delivery';
    checkoutHTML += '</label>';
    checkoutHTML += '<label style="flex: 1; padding: 15px; border: 2px solid #ddd; border-radius: 10px; cursor: pointer; text-align: center;">';
    checkoutHTML += '<input type="radio" name="bulk_payment" value="gcash" onchange="showGCashInfoBulk()"> 📱 GCash Payment';
    checkoutHTML += '</label>';
    checkoutHTML += '</div>';
    
    // GCash info
    checkoutHTML += '<div id="gcash-section-bulk" style="display: none; background: #fff3e0; padding: 15px; border-radius: 10px; margin-bottom: 20px;">';
    checkoutHTML += '<p style="margin-bottom: 10px;"><strong>GCash Payment Instructions:</strong></p>';
    checkoutHTML += '<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=gcash-EASE-bulkorder" style="width: 200px; height: 200px; margin: 10px 0; border-radius: 10px;">';
    checkoutHTML += '</div>';
    
    checkoutHTML += '<button class="btn btn-primary" style="width: 100%; margin-bottom: 10px;" onclick="submitBulkOrder('+total+')">Place Order</button>';
    checkoutHTML += '<button class="btn btn-outline" style="width: 100%;" onclick="closeModal()">Cancel</button>';
    checkoutHTML += '</div>';
    
    showModalContent('Bulk Checkout', checkoutHTML);
}

function showGCashInfoBulk() {
    const gcashSection = document.getElementById('gcash-section-bulk');
    if (gcashSection) {
        gcashSection.style.display = 'block';
    }
}

// Submit bulk order
function submitBulkOrder(total) {
    const paymentMethod = document.querySelector('input[name="bulk_payment"]:checked').value;

    const orderData = {
        type: 'bulk',
        userId: currentBulkUser.id,
        customerName: currentBulkUser.fullName,
        email: currentBulkUser.email,
        phone: currentBulkUser.phone,
        town: currentBulkUser.town,
        barangay: currentBulkUser.barangay || 'Not Specified',
        purok: currentBulkUser.purok || 'Not Specified',
        items: cart,
        quantity: cart.reduce((sum, item) => sum + item.quantity, 0),
        total: total,
        points: 500,
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === 'cash' ? 'pending' : 'awaiting'
    };

    const order = dataManager.addOrder(orderData);
    
    showNotification(`✅ Order #${order.id} placed successfully!\n\nPayment: ${paymentMethod === 'cash' ? 'Cash on Delivery' : 'GCash'}\nYou earned 500 reward points!`);
    
    cart = [];
    closeModal();
    showPage('home');
}

// ========== BULK ORDER FUNCTIONS ==========

// Show bulk login/register modal
function showBulkLoginRegister() {
    const modContent = `
    <div style="background: white; padding: 30px; border-radius: 20px; max-width: 500px; margin: 0 auto;">
        <h2 style="color: #4a148c; margin-bottom: 20px; text-align: center;">Bulk Orders</h2>
        
        <div id="bulk-login-section">
            <h3 style="margin-bottom: 15px;">Sign In / Register</h3>
            <input type="email" id="bulk-email-auth" placeholder="Email Address" style="width: 100%; padding: 12px; margin-bottom: 12px; border-radius: 10px; border: 1px solid #ddd;">
            <input type="password" id="bulk-password-auth" placeholder="Password" style="width: 100%; padding: 12px; margin-bottom: 12px; border-radius: 10px; border: 1px solid #ddd;">
            <p style="font-size: 12px; opacity: 0.7; margin-bottom: 15px;">New users will be registered automatically</p>
            <button class="btn btn-primary" style="width: 100%; margin-bottom: 10px;" onclick="handleBulkAuth()">Sign In / Register</button>
            <button class="btn btn-outline" style="width: 100%;" onclick="closeModal()">Cancel</button>
        </div>
        
        <div id="bulk-register-extra" style="display: none; margin-top: 20px;">
            <h3 style="margin-bottom: 15px;">Complete Your Registration</h3>
            <input type="text" id="bulk-name-new" placeholder="Full Name" style="width: 100%; padding: 12px; margin-bottom: 12px; border-radius: 10px; border: 1px solid #ddd;">
            <input type="tel" id="bulk-phone-new" placeholder="Phone Number" style="width: 100%; padding: 12px; margin-bottom: 12px; border-radius: 10px; border: 1px solid #ddd;">
            <select id="bulk-town-new" style="width: 100%; padding: 12px; margin-bottom: 12px; border-radius: 10px; border: 1px solid #ddd;">
                <option value="">Select Delivery Location</option>
                <option>Cabagan</option>
                <option>Sto. Tomas</option>
                <option>Tumauini</option>
                <option>Ilagan</option>
                <option>Others</option>
            </select>
            <div style="margin-bottom: 12px;">
                <label style="display: block; color: #4a148c; font-weight: 600; margin-bottom: 8px; font-size: 13px;">📍 Your Barangay</label>
                <input type="text" id="bulk-barangay-new" placeholder="e.g. Cabagan, Sto. Tomas" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #ddd;">
            </div>
            <div style="margin-bottom: 12px;">
                <label style="display: block; color: #4a148c; font-weight: 600; margin-bottom: 8px; font-size: 13px;">🏘️ Your Purok/Block/Street</label>
                <input type="text" id="bulk-purok-new" placeholder="e.g. Purok 1, Block A, Maharlika St." style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #ddd;">
            </div>
            <button class="btn btn-primary" style="width: 100%; margin-bottom: 10px;" onclick="completeBulkRegistration()">Complete Registration</button>
            <button class="btn btn-outline" style="width: 100%;" onclick="closeModal()">Cancel</button>
        </div>
    </div>
    `;
    showModalContent('Bulk Orders', modContent);
}

// Handle bulk authentication
function handleBulkAuth() {
    const email = document.getElementById('bulk-email-auth').value;
    const password = document.getElementById('bulk-password-auth').value;

    if (!email || !password) {
        showNotification('❌ Please enter email and password');
        return;
    }

    // Try to login
    const user = dataManager.bulkUserLogin(email, password);
    if (user) {
        currentBulkUser = user;
        updateBulkUserUI();
        updateBulkLoginDisplay();
        updateBulkUserDashboard();
        showNotification(`✅ Welcome back, ${user.fullName}!`);
        closeModal();
        showPage('bulk');
        return;
    }

    // Check if email exists
    const existingUser = dataManager.getBulkUserByEmail(email);
    if (existingUser) {
        showNotification('❌ Password incorrect');
        return;
    }

    // New user - show registration form
    document.getElementById('bulk-login-section').style.display = 'none';
    document.getElementById('bulk-register-extra').style.display = 'block';
    localStorage.setItem('EASE_newBulkEmail', email);
    localStorage.setItem('EASE_newBulkPassword', password);
}

// Complete bulk registration
function completeBulkRegistration() {
    const email = localStorage.getItem('EASE_newBulkEmail');
    const password = localStorage.getItem('EASE_newBulkPassword');
    const name = document.getElementById('bulk-name-new').value;
    const phone = document.getElementById('bulk-phone-new').value;
    const town = document.getElementById('bulk-town-new').value;
    const barangay = document.getElementById('bulk-barangay-new').value;
    const purok = document.getElementById('bulk-purok-new').value;

    if (!name || !phone || !town) {
        showNotification('❌ Please fill in all required fields');
        return;
    }

    if (!barangay) {
        showNotification('❌ Please enter your barangay');
        return;
    }

    if (!purok) {
        showNotification('❌ Please enter your purok/block/street');
        return;
    }

    const user = dataManager.registerBulkUser(email, name, phone, town, password, barangay, purok);
    if (user.error) {
        showNotification('❌ ' + user.error);
        return;
    }

    currentBulkUser = user;
    dataManager.bulkUserLogin(email, password);
    updateBulkUserUI();
    updateBulkLoginDisplay();
    updateBulkUserDashboard();

    localStorage.removeItem('EASE_newBulkEmail');
    localStorage.removeItem('EASE_newBulkPassword');

    showNotification(`✅ Registration successful, ${name}!\nYou can now place bulk orders.`);
    closeModal();
    showPage('bulk');
}

// Bulk order quantity (updated to allow any amount)
function calculateBulk() {
    const q = parseInt(document.getElementById('bulk-qty').value);
    const t = document.getElementById('bulk-town').value;
    const r = document.getElementById('bulk-res');

    if (!q || q < 1 || t === '0') {
        showNotification('❌ Please enter quantity (at least 1) and select location');
        return;
    }

    if (!currentBulkUser) {
        showNotification('⚠️ Please login first to place bulk order');
        showBulkLoginRegister();
        return;
    }

    const unitPrice = 1450;
    const total = q * unitPrice;
    const discount = q >= 20 ? Math.floor((q / 100) * 5) : 0;
    const finalTotal = total - discount;
    const userBarangay = currentBulkUser.barangay || 'Not Specified';
    const userPurok = currentBulkUser.purok || 'Not Specified';
    
    r.style.display = 'block';
    r.innerHTML = `
    <h3 style="color: var(--primary); margin-bottom: 15px;">📋 Quotation Summary</h3>
    <div style="background: #f9f9f9; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
        <p style="margin-bottom: 10px;"><strong>Quantity:</strong> ${q} pieces</p>
        <p style="margin-bottom: 10px;"><strong>Unit Price:</strong> ₱${unitPrice.toLocaleString()}</p>
        <p style="margin-bottom: 10px;"><strong>Subtotal:</strong> ₱${total.toLocaleString()}</p>
        ${discount > 0 ? `<p style="margin-bottom: 10px; color: green;"><strong>Bulk Discount (≥20):</strong> -₱${discount.toLocaleString()}</p>` : ''}
        <p style="font-size: 16px; color: var(--primary); font-weight: 900; margin-top: 15px;">
            <strong>Final Total: ₱${finalTotal.toLocaleString()}</strong>
        </p>
    </div>
    <div style="background: #e3f2fd; padding: 12px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #2196F3;">
        <p style="font-size: 12px; margin-bottom: 5px;"><strong>📦 Delivery Location:</strong> ${t}</p>
        <p style="font-size: 12px; margin-bottom: 5px;"><strong>📍 Barangay:</strong> ${userBarangay}</p>
        <p style="font-size: 12px;"><strong>🏘️ Purok/Block/Street:</strong> ${userPurok}</p>
    </div>
    <button class="btn btn-primary" style="width: 100%; margin-bottom: 10px;" onclick="addBulkToCart(${q}, '${t}', ${finalTotal}, '${userBarangay}', '${userPurok}')">Add to Cart</button>
    `;
}

// Add bulk order to cart
function addBulkToCart(quantity, town, total, barangay, purok) {
    const orderDesc = 'Bulk Order - ' + quantity + ' pcs (' + town + ')' + (barangay ? ' [' + barangay : '') + (purok ? ', ' + purok + ']' : ']');
    addToCart(orderDesc, total, 1, barangay, purok);
    document.getElementById('bulk-qty').value = '';
    document.getElementById('bulk-town').value = '0';
    document.getElementById('bulk-res').innerHTML = '';
    document.getElementById('bulk-res').style.display = 'none';
}

// ========== CONTACT FORM FUNCTIONS ==========

// Show contact form
function showContactForm() {
    const modContent = `
    <div style="background: white; padding: 40px; border-radius: 25px; max-width: 600px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 35px;">
            <div style="background: linear-gradient(135deg, #4a148c, #7b1fa2); color: white; padding: 20px; border-radius: 20px; margin-bottom: 20px;">
                <i class="fas fa-envelope" style="font-size: 40px; margin-bottom: 15px; display: block;"></i>
                <h2 style="margin: 0; font-size: 28px; font-family: 'Montserrat';">Get In Touch</h2>
            </div>
            <p style="color: #666; font-size: 15px; margin: 0;">Have questions? We'd love to hear from you! Send us a message and we'll respond within 24 hours.</p>
        </div>

        <!-- Form -->
        <div style="margin-bottom: 25px;">
            <label style="display: block; color: #4a148c; font-weight: 600; margin-bottom: 8px;">Full Name *</label>
            <input type="text" id="contact-name" placeholder="Enter your name" style="width: 100%; padding: 14px; margin-bottom: 0; border-radius: 10px; border: 2px solid rgba(74, 20, 140, 0.2); box-sizing: border-box; font-size: 14px; transition: border-color 0.3s;">
        </div>

        <div style="margin-bottom: 25px;">
            <label style="display: block; color: #4a148c; font-weight: 600; margin-bottom: 8px;">Email Address *</label>
            <input type="email" id="contact-email" placeholder="your.email@example.com" style="width: 100%; padding: 14px; margin-bottom: 0; border-radius: 10px; border: 2px solid rgba(74, 20, 140, 0.2); box-sizing: border-box; font-size: 14px; transition: border-color 0.3s;">
        </div>

        <div style="margin-bottom: 25px;">
            <label style="display: block; color: #4a148c; font-weight: 600; margin-bottom: 8px;">Phone Number <span style="opacity: 0.6;">(Optional)</span></label>
            <input type="tel" id="contact-phone" placeholder="+63 XXX XXX XXXX" style="width: 100%; padding: 14px; margin-bottom: 0; border-radius: 10px; border: 2px solid rgba(74, 20, 140, 0.2); box-sizing: border-box; font-size: 14px; transition: border-color 0.3s;">
        </div>

        <div style="margin-bottom: 25px;">
            <label style="display: block; color: #4a148c; font-weight: 600; margin-bottom: 8px;">Message *</label>
            <textarea id="contact-message" placeholder="Tell us how we can help... (minimum 10 characters)" style="width: 100%; padding: 14px; margin-bottom: 0; border-radius: 10px; border: 2px solid rgba(74, 20, 140, 0.2); box-sizing: border-box; resize: vertical; min-height: 140px; font-family: 'Outfit', sans-serif; font-size: 14px; transition: border-color 0.3s;"></textarea>
        </div>

        <!-- Info Box -->
        <div style="background: linear-gradient(135deg, rgba(74, 20, 140, 0.05), rgba(123, 31, 162, 0.05)); padding: 15px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #4a148c;">
            <p style="margin: 0; font-size: 13px; color: #666;">
                <i class="fas fa-info-circle" style="color: #4a148c; margin-right: 8px;"></i>
                <strong>All fields marked with * are required</strong>
            </p>
        </div>

        <!-- Buttons -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <button class="btn btn-primary" style="width: 100%; padding: 14px; display: flex; align-items: center; justify-content: center; gap: 8px; border: none; border-radius: 10px;" onclick="submitContact()">
                <i class="fas fa-paper-plane"></i> Send Message
            </button>
            <button class="btn btn-outline" style="width: 100%; padding: 14px; border: 2px solid #4a148c; color: #4a148c; background: white; border-radius: 10px; cursor: pointer; font-weight: 600;" onclick="closeModal()">
                <i class="fas fa-times"></i> Cancel
            </button>
        </div>
    </div>
    `;
    showModalContent('Contact Us', modContent);
}

// Submit contact form
function submitContact() {
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const phone = document.getElementById('contact-phone').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    // Validation
    if (!name) {
        showNotification('❌ Please enter your full name');
        return;
    }

    if (!email) {
        showNotification('❌ Please enter your email address');
        return;
    }

    if (!message) {
        showNotification('❌ Please enter your message');
        return;
    }

    if (message.length < 10) {
        showNotification('❌ Message must be at least 10 characters');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('❌ Please enter a valid email address');
        return;
    }

    // Validate phone if provided
    if (phone && phone.length < 7) {
        showNotification('❌ Please enter a valid phone number');
        return;
    }

    // Add contact to data
    const contact = dataManager.addContact(name, email, phone, message);

    showNotification(`✅ Message sent successfully!\n\nWe'll review your message and respond to ${email} within 24 hours.\n\nThank you for contacting EASE Apparel!`);
    
    // Clear form
    document.getElementById('contact-name').value = '';
    document.getElementById('contact-email').value = '';
    document.getElementById('contact-phone').value = '';
    document.getElementById('contact-message').value = '';
    
    closeModal();
}

// ========== MODAL FUNCTIONS ==========

// Show modal with content
function showModalContent(title, content) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    if (!modal) {
        console.error('Modal element not found');
        return;
    }

    modalTitle.innerHTML = title || 'EASE Apparel';
    modalBody.innerHTML = content;
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    if (modal && event.target === modal) {
        modal.style.display = 'none';
    }
});

// ========== UTILITY FUNCTIONS ==========

// Show notification with better styling
function showNotification(message) {
    const notif = document.getElementById('notification');
    if (!notif) {
        console.error('Notification element not found');
        return;
    }
    
    notif.innerHTML = message;
    notif.style.display = 'block';
    notif.style.opacity = '1';

    setTimeout(() => {
        notif.style.opacity = '0';
        setTimeout(() => {
            notif.style.display = 'none';
        }, 300);
    }, 4000);
}

// Bulk user logout
function bulkUserLogout() {
    if (currentBulkUser) {
        const name = currentBulkUser.fullName;
        currentBulkUser = null;
        dataManager.bulkUserLogout();
        updateBulkUserUI();
        updateBulkLoginDisplay();
        showNotification(`👋 Goodbye, ${name}!\nYou've been signed out.`);
        cart = [];
        updateCartBadge();
    }
}

// Update cart badge
function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
        badge.textContent = cart.length;
        badge.style.display = cart.length > 0 ? 'flex' : 'none';
    }
}

// Show bulk register modal (backward compatibility)
function showBulkRegister() {
    showBulkLoginRegister();
}

// Close bulk modal
function closeBulkModal() {
    closeModal();
}

// Remove cart item
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartBadge();
    if (cart.length === 0) {
        closeModal();
        showNotification('✅ Item removed from cart');
    } else {
        showCheckoutView();
    }
}

// ========== INITIALIZATION ==========

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize data system
    dataManager.initializeData();

    // Check if there's a logged-in bulk user
    const bulkUserEmail = localStorage.getItem('EASE_currentBulkUser');
    if (bulkUserEmail) {
        const users = dataManager.getBulkUsers();
        const user = users.find(u => u.email === bulkUserEmail);
        if (user) {
            currentBulkUser = user;
        }
    }

    // Update UI
    updateCartBadge();
    updatePointsDisplay();
    updateBulkUserUI();
    updateBulkLoginDisplay();

    // Initialize modals if not exist
    createModalStructure();

    console.log('✅ EASE Apparel system initialized successfully');
});

// Update bulk login form state visibility
function updateBulkLoginDisplay() {
    const loginState = document.getElementById('bulk-login-state');
    const formState = document.getElementById('bulk-form-state');
    const nameDisplay = document.getElementById('bulk-user-name');

    if (currentBulkUser) {
        if (loginState) loginState.style.display = 'none';
        if (formState) formState.style.display = 'block';
        if (nameDisplay) nameDisplay.textContent = `📧 ${currentBulkUser.email}`;
        updateBulkUserDashboard();
    } else {
        if (loginState) loginState.style.display = 'block';
        if (formState) formState.style.display = 'none';
    }
}

// Create modal structure if it doesn't exist
function createModalStructure() {
    if (!document.getElementById('modal')) {
        const modalHTML = `
        <div id="modal" style="display: none; position: fixed; z-index: 1000; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.6); overflow-y: auto; padding: 20px;">
            <div style="background: white; margin: auto; padding: 0; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); max-width: 600px; margin-top: 50px;">
                <div style="background: linear-gradient(135deg, #4a148c, #7b1fa2); color: white; padding: 20px; border-radius: 20px 20px 0 0; display: flex; justify-content: space-between; align-items: center;">
                    <h2 id="modal-title" style="margin: 0; font-size: 24px;">EASE Apparel</h2>
                    <button onclick="closeModal()" style="background: rgba(255,255,255,0.3); border: none; color: white; font-size: 28px; cursor: pointer; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">×</button>
                </div>
                <div id="modal-body" style="padding: 20px; max-height: 70vh; overflow-y: auto;"></div>
            </div>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
}

// Window load handler
window.addEventListener('load', function() {
    unlockVIPContent();
    createModalStructure();
});
