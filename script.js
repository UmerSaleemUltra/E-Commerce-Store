    // Array of products for an e-commerce store
    let products = [
        { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics', stock: 5 },
        { id: 2, name: 'Smartphone', price: 699.99, category: 'Electronics', stock: 10 },
        { id: 3, name: 'Tablet', price: 399.99, category: 'Electronics', stock: 10 },
        { id: 4, name: 'Headphones', price: 199.99, category: 'Accessories', stock: 15 },
        { id: 5, name: 'Keyboard', price: 49.99, category: 'Accessories', stock: 30 },
        { id: 6, name: 'Monitor', price: 299.99, category: 'Electronics', stock: 7 },
    ];

    function createProductCards(products) {
        const container = document.getElementById('productContainer');
        container.innerHTML = ''; // Clear existing content

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            if (product.stock === 0) {
                card.classList.add('out-of-stock');
            }

            card.innerHTML = `
                <h2>${product.name}</h2>
                <p class="price">$${product.price.toFixed(2)}</p>
                <p>Category: ${product.category}</p>
                <p>Stock: ${product.stock}</p>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onclick="addToCart(${product.id})">
                    Add To Cart
                </button>
            `;

            container.appendChild(card);
        });
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (!product || product.stock === 0) return;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItem = cart.find(item => item.id === productId);

        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        product.stock--;
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('products', JSON.stringify(products));
        createProductCards(products);
        displayCart();
    }

    function displayCart() {
        const cartContainer = document.getElementById('cartContainer');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartContainer.innerHTML = '<h2>Shopping Cart</h2>';

        if (cart.length === 0) {
            cartContainer.innerHTML += '<p>Cart is empty.</p>';
            return;
        }

        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>
            `;
            cartContainer.appendChild(cartItem);
        });

        const totalElement = document.createElement('p');
        totalElement.className = 'total';
        totalElement.innerText = `Total: $${total.toFixed(2)}`;
        cartContainer.appendChild(totalElement);
    }

    // Initialize the product cards and cart display
    createProductCards(products);
    displayCart();

