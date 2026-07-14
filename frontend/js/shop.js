// frontend/js/shop.js

// Generate 32 distinct watches with different colors and styles
const distinctWatches = [
    { brand: "Hublot", model: "Classic Fusion", color: "Black Dial", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=400&q=80" },
    { brand: "Rolex", model: "Submariner", color: "Blue Dial", image: "https://images.unsplash.com/photo-1548171915-e7afefa0396a?auto=format&fit=crop&w=400&q=80" },
    { brand: "Tag Heuer", model: "Carrera", color: "Silver Steel", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=400&q=80" },
    { brand: "Omega", model: "Seamaster", color: "Rose Gold", image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=400&q=80" },
    { brand: "Breitling", model: "Navitimer", color: "Brown Leather", image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=400&q=80" },
    { brand: "Patek Philippe", model: "Nautilus", color: "Green Dial", image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&w=400&q=80" },
    { brand: "Rolex", model: "Daytona", color: "Gold/Black", image: "https://images.unsplash.com/photo-1584305886619-35c8e001851e?auto=format&fit=crop&w=400&q=80" },
    { brand: "Hublot", model: "Big Bang", color: "Carbon Fiber", image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=400&q=80" },
    { brand: "Omega", model: "Speedmaster", color: "All Black", image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=400&q=80" },
    { brand: "Tag Heuer", model: "Monaco", color: "Square Blue", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80" },
    { brand: "Rolex", model: "Datejust", color: "Two-Tone", image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=400&q=80" },
    { brand: "Breitling", model: "Superocean", color: "Orange/Black", image: "https://images.unsplash.com/photo-1549972574-8772023dc881?auto=format&fit=crop&w=400&q=80" },
    { brand: "Audemars", model: "Royal Oak", color: "Silver/White", image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=400&q=80" },
    { brand: "Cartier", model: "Santos", color: "Rose Gold/Silver", image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=400&q=80" },
    { brand: "Tudor", model: "Black Bay", color: "Red Bezel", image: "https://images.unsplash.com/photo-1596700854449-74d30623d6a3?auto=format&fit=crop&w=400&q=80" },
    { brand: "IWC", model: "Portugieser", color: "White/Blue", image: "https://images.unsplash.com/photo-1565507960114-1f3ebbc8e16d?auto=format&fit=crop&w=400&q=80" },
    { brand: "Panerai", model: "Luminor", color: "Black Leather", image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=400&q=80" },
    { brand: "Hublot", model: "Aerofusion", color: "Skeleton", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=400&q=80" },
    { brand: "Rolex", model: "Oyster Perpetual", color: "Yellow Dial", image: "https://images.unsplash.com/photo-1548171915-e7afefa0396a?auto=format&fit=crop&w=400&q=80" },
    { brand: "Omega", model: "Aqua Terra", color: "Teal Dial", image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=400&q=80" },
    { brand: "Tag Heuer", model: "Aquaracer", color: "Green/Steel", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=400&q=80" },
    { brand: "Breitling", model: "Chronomat", color: "Gold Bezel", image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=400&q=80" },
    { brand: "Patek Philippe", model: "Aquanaut", color: "Black Rubber", image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&w=400&q=80" },
    { brand: "Rolex", model: "Explorer", color: "Black/Steel", image: "https://images.unsplash.com/photo-1584305886619-35c8e001851e?auto=format&fit=crop&w=400&q=80" },
    { brand: "Hublot", model: "Spirit of Big Bang", color: "Titanium", image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=400&q=80" },
    { brand: "Omega", model: "Planet Ocean", color: "Orange/Steel", image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=400&q=80" },
    { brand: "Audemars", model: "Offshore", color: "Blue/Rose Gold", image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=400&q=80" },
    { brand: "Cartier", model: "Tank", color: "Gold/Leather", image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=400&q=80" },
    { brand: "Tudor", model: "Pelagos", color: "Blue Titanium", image: "https://images.unsplash.com/photo-1596700854449-74d30623d6a3?auto=format&fit=crop&w=400&q=80" },
    { brand: "IWC", model: "Pilot", color: "Black/Ceramic", image: "https://images.unsplash.com/photo-1565507960114-1f3ebbc8e16d?auto=format&fit=crop&w=400&q=80" },
    { brand: "Panerai", model: "Radiomir", color: "Brown Dial", image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=400&q=80" },
    { brand: "Rolex", model: "Yacht-Master", color: "Rhodium", image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=400&q=80" }
];

// Helper to get random integer for prices
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate the 32 specific watches
let products = distinctWatches.map((w, i) => {
    return {
        id: i + 1,
        name: `${w.brand} ${w.model} - ${w.color}`,
        price: getRandomInt(4000, 12000),
        rating: (Math.random() * (5.0 - 4.2) + 4.2).toFixed(1),
        image: w.image
    };
});

// If the admin has added new products, load them from localStorage and prepend them
const customProducts = JSON.parse(localStorage.getItem('adminProducts')) || [];
products = [...customProducts, ...products];

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
