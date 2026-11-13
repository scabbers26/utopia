document.addEventListener('DOMContentLoaded', function() {
    const cartLink = document.querySelector('.cart-link');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartSidebarClose = document.getElementById('cartSidebarClose');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const subtotalAmount = document.querySelector('.subtotal-amount');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    function updateCartSidebar() {
        cartItemsContainer.innerHTML = '';
        if (cartItems.length === 0) {
            cartItemsContainer.appendChild(emptyCartMessage);
            emptyCartMessage.style.display = 'block'; // Show empty cart message
            subtotalAmount.textContent = '$0.00'; // Reset subtotal to zero when cart is empty
        } else {
            emptyCartMessage.style.display = 'none'; // Hide empty cart message
            let subtotal = 0;
            cartItems.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}">
                    <div class="cart-item-details">
                        <span>${item.title}</span>
                        <span class="cart-item-quantity">Quantity: ${item.quantity}</span>
                        <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <span class="remove-cart-item" data-index="${index}">&times;</span>
                `;
                cartItemsContainer.appendChild(cartItem);

                subtotal += item.price * item.quantity; // Calculate subtotal
            });

            subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
        }

        updateCartLink(); // Update cart link display in sidebar
    }

    function updateCartLink() {
        const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartLink.textContent = `CART (${itemCount} ITEM${itemCount !== 1 ? 'S' : ''})`; // Corrected pluralization
    }

    function addItemToCart(item) {
        const existingItem = cartItems.find(cartItem => cartItem.title === item.title);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            item.quantity = 1;
            cartItems.push(item);
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartSidebar();
        updateCartLink();
    }

    function removeItemFromCart(index) {
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartSidebar();
        updateCartLink();
    }

    document.getElementById('productForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const item = {
            title: 'UTOPIA 2 DISK VINYL LP COVER 1', // Replace with dynamic product title
            price: 50, // Replace with dynamic product price
            image: 'https://shop.travisscott.com/cdn/shop/files/HERO_VINYL_01_UPDATE-_1_1500x.png?v=1690507172' // Replace with dynamic product image URL
        };
        addItemToCart(item);
    });

    cartLink.addEventListener('click', function() {
        cartSidebar.classList.add('active');
        updateCartSidebar(); // Update sidebar when opened
    });

    cartSidebarClose.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
    });

    cartItemsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-cart-item')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            removeItemFromCart(index);
        }
    });

    updateCartLink(); // Initial link update
});

