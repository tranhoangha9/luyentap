function loadCart(){
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    
    const existingItems = cartItemsContainer.querySelectorAll('.cart-item');
    existingItems.forEach(item => item.remove());

    if (cart.length === 0){
        return;
    }
    
    cart.forEach((product, index) => {
        createNewCartItem(product);
    });
};
function updateCartItem(cartItemElement, product) {
    const img = cartItemElement.querySelector('.item-image img');
    img.src = product.image;
    img.alt = product.name;
    
    cartItemElement.querySelector('.item-details h4').textContent = product.name;
    cartItemElement.querySelector('.qty-number').textContent = product.quantity;
    cartItemElement.querySelector('.item-price .price').textContent = `$${product.price.toFixed(2)}`;
    
    const total = product.price * product.quantity;
    cartItemElement.querySelector('.item-total .total').textContent = `$${total.toFixed(2)}`;
    cartItemElement.style.display = '';
}

document.addEventListener('DOMContentLoaded', function(){
    loadCart();
    updateOrderSummary();
});
function removeFromLocalStorage(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Removed from localStorage:', productName);
    console.log('Updated cart:', cart);
}

function updateOrderSummary(){
    let subtotal = 0;

    document.querySelectorAll('.cart-item').forEach(cartItem => {
        if (cartItem.style.display !== 'none') {
            const totalElement = cartItem.querySelector('.item-total .total');
            const itemTotal = parseFloat(totalElement.textContent.replace('$',''));
            subtotal += itemTotal;
        }
    });

    const shipping = subtotal > 0 ? 15.00 : 0;
    const tax = subtotal * 0.08;
    const finalTotal = subtotal + shipping + tax;
    const summaryRows = document.querySelectorAll('.summary-row');
    summaryRows[0].querySelector('span:last-child').textContent = `$${subtotal.toFixed(2)}`;
    summaryRows[1].querySelector('span:last-child').textContent = `$${shipping.toFixed(2)}`;
    summaryRows[2].querySelector('span:last-child').textContent = `$${tax.toFixed(2)}`;
    document.querySelector('.total-row span:last-child').textContent = `$${finalTotal.toFixed(2)}`;
}

function createNewCartItem(product){
    const cartItemsContainer = document.querySelector('.cart-items');
    const newItem = document.createElement('div');
    newItem.className = 'cart-item';
    newItem.innerHTML = `
        <div class="item-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="item-details">
            <h4>${product.name}</h4>
            <p class="item-category">Indoor Plant</p>
        </div>
        <div class="item-quantity-total">
            <div class="item-quantity">
                <button class="qty-btn minus">-</button>
                <span class="qty-number">${product.quantity}</span>
                <button class="qty-btn plus">+</button>
            </div>
            <div class="item-total">
                <span class="total">$${(product.price * product.quantity).toFixed(2)}</span>
            </div>
        </div>
        <div class="item-price" style="display: none;">
            <span class="price">$${product.price.toFixed(2)}</span>
        </div>
        <div class="item-remove">
            <button class="remove-btn">🗑️</button>
        </div>
    `;
    
    cartItemsContainer.appendChild(newItem);
    attachCartItemEvents(newItem, product);
}

function attachCartItemEvents(cartItem, product) {
    const qtyButtons = cartItem.querySelectorAll('.qty-btn');
    qtyButtons.forEach(button => {
        button.addEventListener('click', function(){
            const qtyNumber = this.parentNode.querySelector('.qty-number');
            let qty = parseInt(qtyNumber.textContent);
            if(this.classList.contains('plus')){
                qty++;
            } else if(qty > 1){
                qty--;
            }
            qtyNumber.textContent = qty;
            
            const price = cartItem.querySelector('.item-price .price').textContent;
            const unitPrice = parseFloat(price.replace('$',''));
            cartItem.querySelector('.item-total .total').textContent = `$${(unitPrice * qty).toFixed(2)}`;

            updateOrderSummary();
        });
    });
    
    const removeBtn = cartItem.querySelector('.remove-btn');
    removeBtn.addEventListener('click', function(){
        cartItem.remove();
        removeFromLocalStorage(product.name);
        updateOrderSummary();
    });
}
