// frontend/js/shop.js

const brands = ["Hublot", "Rolex", "Tag Heuer", "Omega", "Breitling", "Patek Philippe"];
const models = ["Classic Fusion", "Submariner", "Carrera", "Seamaster", "Navitimer", "Nautilus", "Daytona", "Big Bang"];

// Helper to get random integer
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate 32 mock products
const products = [];
for (let i = 1; i <= 32; i++) {
    const brand = brands[getRandomInt(0, brands.length - 1)];
    const model = models[getRandomInt(0, models.length - 1)];
    // Prices from 4000 to 12000
    const price = getRandomInt(4000, 12000);
    // Ratings from 4.0 to 5.0
    const rating = (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1);
    
    products.push({
        id: i,
        name: `${brand} ${model} - Ref ${getRandomInt(100, 999)}`,
        price: price,
        rating: rating,
        image: `assets/200.jpg` // Fallback placeholder
    });
}

function renderProducts() {
    const grid = document.getElementById("productGrid");
    if (!grid) return;
    
    let html = "";
    products.forEach(p => {
        html += `
            <div class="product-card">
                <img src="${p.image}" alt="${p.name}" class="product-img">
                <div class="product-info">
                    <h3 class="product-title">${p.name}</h3>
                    <div class="product-price">Rs. ${p.price.toLocaleString()}</div>
                    <div class="product-rating">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star${p.rating < 4.8 ? '-half-stroke' : ''}"></i>
                        <span>(${p.rating})</span>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart(${p.id})">Add to Cart</button>
                </div>
            </div>
        `;
    });
    grid.innerHTML = html;
}

// Simple cart logic using localStorage
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
    }
}

document.addEventListener("DOMContentLoaded", renderProducts);
