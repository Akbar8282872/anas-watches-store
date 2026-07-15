// frontend/js/shop.js
// type="module" — Firebase imports at the top

import { db } from './firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 32 fully unique watches — every image URL is different
const distinctWatches = [
    { brand: "Hublot",         model: "Classic Fusion",     color: "Black Dial",       image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80" },
    { brand: "Rolex",          model: "Submariner",         color: "Blue Dial",        image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=400&q=80" },
    { brand: "Tag Heuer",      model: "Carrera",            color: "Silver Steel",     image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&q=80" },
    { brand: "Omega",          model: "Seamaster",          color: "Rose Gold",        image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=400&q=80" },
    { brand: "Breitling",      model: "Navitimer",          color: "Brown Leather",    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&q=80" },
    { brand: "Patek Philippe", model: "Nautilus",           color: "Green Dial",       image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=400&q=80" },
    { brand: "Rolex",          model: "Daytona",            color: "Gold/Black",       image: "https://images.unsplash.com/photo-1548171915-e7afefa0396a?w=400&q=80" },
    { brand: "Hublot",         model: "Big Bang",           color: "Carbon Fiber",     image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=400&q=80" },
    { brand: "Omega",          model: "Speedmaster",        color: "All Black",        image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=400&q=80" },
    { brand: "Tag Heuer",      model: "Monaco",             color: "Square Blue",      image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=400&q=80" },
    { brand: "Rolex",          model: "Datejust",           color: "Two-Tone",         image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=400&q=80" },
    { brand: "Breitling",      model: "Superocean",         color: "Orange/Black",     image: "https://images.unsplash.com/photo-1584305886619-35c8e001851e?w=400&q=80" },
    { brand: "Audemars",       model: "Royal Oak",          color: "Silver/White",     image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&q=80" },
    { brand: "Cartier",        model: "Santos",             color: "Rose Gold/Silver", image: "https://images.unsplash.com/photo-1565507960114-1f3ebbc8e16d?w=400&q=80" },
    { brand: "Tudor",          model: "Black Bay",          color: "Red Bezel",        image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=400&q=80" },
    { brand: "IWC",            model: "Portugieser",        color: "White/Blue",       image: "https://images.unsplash.com/photo-1596700854449-74d30623d6a3?w=400&q=80" },
    { brand: "Panerai",        model: "Luminor",            color: "Black Leather",    image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&q=80" },
    { brand: "Hublot",         model: "Aerofusion",         color: "Skeleton",         image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&q=80" },
    { brand: "Rolex",          model: "Oyster Perpetual",   color: "Yellow Dial",      image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=400&q=80" },
    { brand: "Omega",          model: "Aqua Terra",         color: "Teal Dial",        image: "https://images.unsplash.com/photo-1614944848161-b7e4c4ac1ab7?w=400&q=80" },
    { brand: "Tag Heuer",      model: "Aquaracer",          color: "Green/Steel",      image: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=400&q=80" },
    { brand: "Breitling",      model: "Chronomat",          color: "Gold Bezel",       image: "https://images.unsplash.com/photo-1495704907664-81f74a7efd9b?w=400&q=80" },
    { brand: "Patek Philippe", model: "Aquanaut",           color: "Black Rubber",     image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400&q=80" },
    { brand: "Rolex",          model: "Explorer",           color: "Black/Steel",      image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&q=80" },
    { brand: "Hublot",         model: "Spirit of Big Bang", color: "Titanium",         image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=400&q=80" },
    { brand: "Omega",          model: "Planet Ocean",       color: "Orange/Steel",     image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80" },
    { brand: "Audemars",       model: "Offshore",           color: "Blue/Rose Gold",   image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=400&q=80" },
    { brand: "Cartier",        model: "Tank",               color: "Gold/Leather",     image: "https://images.unsplash.com/photo-1536496803680-a09e4f4a5f9c?w=400&q=80" },
    { brand: "Tudor",          model: "Pelagos",            color: "Blue Titanium",    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&q=80" },
    { brand: "IWC",            model: "Pilot",              color: "Black/Ceramic",    image: "https://images.unsplash.com/photo-1516737488772-af0a2c89e29a?w=400&q=80" },
    { brand: "Panerai",        model: "Radiomir",           color: "Brown Dial",       image: "https://images.unsplash.com/photo-1560343787-01a3fa6e1604?w=400&q=80" },
    { brand: "Rolex",          model: "GMT Master II",      color: "Pepsi/Steel",      image: "https://images.unsplash.com/photo-1614086138004-e91b7e3e3c93?w=400&q=80" }
];

// Fixed prices (not random so they don't change on every reload)
const prices = [
    7500, 11000, 6200, 9800, 8400, 14500, 12000, 9200, 7800, 6500,
    10500, 8800, 13200, 11500, 7200, 9000, 6800, 10200, 8600, 7400,
    6900, 11800, 13500, 9600, 10800, 8200, 12500, 7600, 9400, 6600,
    8000, 11200
];

const ratings = [
    "4.9", "5.0", "4.7", "4.8", "4.6", "5.0", "4.9", "4.8",
    "4.7", "4.6", "4.9", "4.8", "5.0", "4.7", "4.6", "4.8",
    "4.7", "4.9", "4.8", "4.6", "4.7", "4.8", "5.0", "4.9",
    "4.8", "4.7", "4.9", "4.8", "4.7", "4.6", "4.8", "4.9"
];

let products = distinctWatches.map((w, i) => ({
    id: i + 1,
    name: `${w.brand} ${w.model} - ${w.color}`,
    price: prices[i],
    rating: ratings[i],
    image: w.image
}));

async function renderProducts() {
    // Load admin-added products from Firebase
    try {
        const querySnapshot = await getDocs(collection(db, "adminProducts"));
        let customProducts = [];
        querySnapshot.forEach((doc) => {
            customProducts.push(doc.data());
        });
        products = [...customProducts, ...products];
    } catch(e) {
        console.warn("Firebase not connected. Showing default items only.", e);
    }

    const grid = document.getElementById("productGrid");
    if (!grid) return;

    let html = "";
    products.forEach(p => {
        const stars = parseFloat(p.rating) >= 5.0
            ? '★★★★★'
            : parseFloat(p.rating) >= 4.8
                ? '★★★★½'
                : '★★★★☆';

        html += `
            <div class="product-card">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
                <div class="product-info">
                    <h3>${p.name}</h3>
                    <div class="product-price">Rs. ${p.price.toLocaleString()}</div>
                    <div class="product-rating">${stars} <span style="color:var(--muted); font-size:0.75rem">(${p.rating})</span></div>
                    <button class="btn-add-cart" onclick="addToCart(${p.id})">
                        <i class="fa-solid fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
    });
    grid.innerHTML = html;
}

window.addToCart = function(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find(p => p.id === productId || p.name === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        // Show toast instead of alert
        showToast(`✓ ${product.name} added to cart!`);
    }
}

function showToast(msg) {
    let toast = document.getElementById('cart-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'cart-toast';
        toast.style.cssText = `
            position: fixed; bottom: 2rem; right: 2rem;
            background: #c9a84c; color: #000;
            padding: 1rem 1.8rem; border-radius: 4px;
            font-size: 0.85rem; font-weight: 600;
            z-index: 9999; transform: translateY(100px);
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        `;
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.transform = 'translateY(0)';
    setTimeout(() => { toast.style.transform = 'translateY(100px)'; }, 3000);
}

document.addEventListener("DOMContentLoaded", renderProducts);
