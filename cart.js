// Initialize cart from localStorage or as an empty array
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to render the cart items on the page
function renderCart() {
    const main = document.querySelector('.main');
    main.innerHTML = ''; // Clear existing content

    if (cart.length === 0) {
        main.innerHTML = '<center><h3>Your cart is empty!</h3></center>';
        renderOrderSummary(); // Update order summary when cart is empty
        return;
    }
    cart.forEach((item, index) => {
        main.innerHTML += `
            <div class="container">
                <div><img src="${item.image}" height="160px" width="160px"></div>
                <div>
                    <h4>${item.name}</h4>
                    <h3>₹${item.price}</h3>
                    <table class="table">
                        <tr>
                            <td><button onclick="updateQuantity(${index}, -1)" style="background-color:darkslategray"><strong>-</strong></button></td>
                            <td style="background-color:black;color:red;border:1px solid black">${item.quantity}</td>
                            <td><button onclick="updateQuantity(${index}, 1)" style="background-color:darkslategray"><strong>+</strong></button></td>
                        </tr>
                    </table>
                </div>
                <div>
                    <i class="fa-regular fa-trash-can" onclick="removeItem(${index})"></i>
                </div>
            </div>
            <hr width="95%">
        `;
    });

    renderOrderSummary(); // Update the order summary
}

// Function to update the cart count in the header
function updateCartCount() {
    const cartCount = cart.length;  // Use cart length directly
    const cartIcon = document.querySelector('.cart-count'); // Select the cart count element
    if (cartCount > 0) {
        cartIcon.innerHTML = cartCount;
        cartIcon.style.display = 'inline'; // Show the count badge
    } else {
        cartIcon.style.display = 'none'; // Hide the badge if the cart is empty
    }
}

// Function to update item quantity in the cart
function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1); // Remove item if quantity is zero
    }
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    renderCart(); // Re-render the cart
    updateCartCount(); // Update the cart count
}

// Function to remove an item from the cart
function removeItem(index) {
    cart.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    renderCart(); // Re-render the cart
    updateCartCount(); // Update the cart count
}

// Function to add items to the cart
function addToCart(item) {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if the item exists
        localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
        updateCartCount(); // Update the cart count (if item already exists, do not re-render the cart immediately)
    } else {
        cart.push({ ...item, quantity: 1 }); // Add new item to the cart
        localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
        renderCart(); // Re-render the cart if a new item is added
        updateCartCount(); // Update the cart count
    }
}

// Function to calculate and render order summary
function renderOrderSummary() {
    const orderSummary = document.querySelector('.main1');
    console.log(cart);

    if (cart.length === 0) {
        orderSummary.innerHTML = '<h2>Order Summary</h2><p>Your cart is empty.</p>';
        return;
    }

    // Check that cart items have originalPrice and price
    const originalPrice = cart.reduce((total, item) => {
        return total + (item.originalPrice ? item.originalPrice * item.quantity : 0);
    }, 0);

    const totalPrice = cart.reduce((total, item) => {
        return total + (item.price ? item.price * item.quantity : 0);
    }, 0);
    const discount = originalPrice - totalPrice;

    orderSummary.innerHTML = `
        <h2>Order Summary (${cart.reduce((total, item) => total + item.quantity, 0)} items)</h2>
        <table style="width:600px;height:180px;">
            <tr>
                <td style="color:gray">Original Price</td>                      
                <td>₹${originalPrice.toFixed(2)}</td>
            </tr>
            <tr>
                <td style="color:gray">Discount</td>                           
                <td style="color:greenyellow">-₹${discount.toFixed(2)}</td>
            </tr> 
            <tr>
                <td style="color:gray">Delivery</td>                             
                <td style="color:greenyellow;">Free</td>
            </tr>
            <tr>
                <td><b>Total Price</b></td>                        
                <td><b>₹${totalPrice.toFixed(2)}</b></td>
            </tr>
        </table>
        <br>
        <button type="button" onclick="checkout()" style="background-color:orangered;color:white;border:none;height:30px;width:450px">Checkout</button>
    `;
}
function openform(){
    document.getElementById('form').style.display='block';
}
function closeform(){
    document.getElementById('form').style.display='none';
}
// Function to handle checkout
function checkout() {
    alert('Proceeding to checkout...');
    // You can add checkout functionality here
}
function handleProductClick(product) {
    const products = document.querySelectorAll('.featured-product');
    products.forEach(item => item.classList.remove('active'));
    product.classList.add('active');
}
// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderCart(); // Render the cart items on page load
    updateCartCount(); // Initialize the cart count in the header
});
