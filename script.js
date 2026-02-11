const products = [
    { 
        id: 1, name: "Bow shape Item Holder", 
        price: 60, 
        img: "dec.webp" 
    },
    { 
        id: 2, name: "Dragon Decorative Light", 
        price: 99, 
        img: "Dragon1.JPG" 
    },
    { 
        id: 3, name: "Book Reading Decorative Light", 
        price: 150, 
        img: "mlamp.jpeg" 
    },
    { 
        id: 4, name: "Flower Shape Table Lamp", 
        price: 150, 
        img: "Lamp2.jpg" 
    },
    { 
        id: 5, name: "Table Lamp with Stand", 
        price: 150, 
        img: "Lamp3.jpg" 
    },
    { 
        id: 6, name: "Table Lamp", 
        price: 150, 
        img: "Lamp 1.jpg" 
    },
    { 
        id: 7, name: "Toy Military car", 
        price: 150, 
        img: "toy.jpg" 
    },
    { 
        id: 8, name: "Self Made Dinasour", 
        price: 150, 
        img: "toy3.webp" 
    },
    { 
        id: 9, name: "Toy jeep", 
        price: 150, 
        img: "toy5.jpg" 
    },
    { 
        id: 10, name: "Military carrier", 
        price: 150, 
        img: "toy6.jpg" 
    },
    { 
        id: 11, name: "Toy Car with Carrage", 
        price: 150, 
        img: "toy8.png" 
    }
];

let cart = JSON.parse(localStorage.getItem('myTechCart')) || [];

function displayProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = products.map(p => `
        <div class="card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
}

function addToCart(id) {
    const item = products.find(p => p.id === id);
    
    // Check if item is already in the cart
    const existingItem = cart.find(p => p.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        // Add new item with a quantity property
        cart.push({ ...item, quantity: 1 });
    }
    
    updateCartUI();
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
    <img src="${item.img}" alt="${item.name}" class="cart-thumb">
    <div class="cart-info">
        <span class="cart-name">${item.name}</span>
        <div class="quantity-controls">
            <button onclick="changeQuantity(${index}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="changeQuantity(${index}, 1)">+</button>
        </div>
        <span class="cart-price">₹${item.price}</span>
    </div>
        <button class="butto" title="Remove Item" onclick="removeFromCart(${index})">❌</button>
    </div>
`).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('total-price').innerText = total;

    localStorage.setItem('myTechCart', JSON.stringify(cart));
}

function removeFromCart(index) {
    cart.splice(index, 1); // Remove 1 item at that position
    updateCartUI(); // Refresh the UI and Save to LocalStorage
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

displayProducts();

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Add some Products first.");
        return;
    }

    // 1. Show success message
    alert("🎉 Order placed successfully! Thank you for shopping at 3DItem Store.");

    // 2. Clear the cart array
    cart = [];

    // 3. Update the UI and Local Storage (this clears the browser memory)
    updateCartUI();
    
    // 4. Close the cart automatically
    toggleCart();
}

function changeQuantity(index, delta) {
    cart[index].quantity += delta;

    // Remove item if quantity drops to 0
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCartUI();
}