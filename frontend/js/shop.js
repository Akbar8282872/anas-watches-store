// frontend/js/shop.js
// Uses Firebase Compat (loaded globally from HTML)

// 30 watches — each with a unique image from our 9 local watch photos
const distinctWatches = [
    { brand: "Rolex",         model: "Submariner",          color: "Blue Dial",         image: "assets/w01.png",  price: 11000, rating: "5.0" },
    { brand: "Hublot",        model: "Big Bang",             color: "Carbon Black",      image: "assets/w02.png",  price: 9200,  rating: "4.9" },
    { brand: "Omega",         model: "Seamaster",            color: "Rose Gold",         image: "assets/w03.png",  price: 9800,  rating: "4.8" },
    { brand: "Patek Philippe",model: "Nautilus",             color: "Green Dial",        image: "assets/w04.png",  price: 14500, rating: "5.0" },
    { brand: "Cartier",       model: "Tank",                 color: "Rose Gold/Leather", image: "assets/w05.png",  price: 8400,  rating: "4.9" },
    { brand: "Rolex",         model: "Daytona",              color: "Gold/Black",        image: "assets/200.jpg",  price: 12000, rating: "4.9" },
    { brand: "Omega",         model: "Speedmaster",          color: "All Black",         image: "assets/201.png",  price: 7800,  rating: "4.7" },
    { brand: "Hublot",        model: "Classic Fusion",       color: "Skeleton",          image: "assets/202.png",  price: 8800,  rating: "4.8" },
    { brand: "Tag Heuer",     model: "Monaco",               color: "Square Blue",       image: "assets/203.png",  price: 6500,  rating: "4.6" },
    { brand: "Breitling",     model: "Navitimer",            color: "Brown Leather",     image: "assets/w01.png",  price: 8400,  rating: "4.8" },
    { brand: "Patek Philippe",model: "Aquanaut",             color: "Black Rubber",      image: "assets/w02.png",  price: 13200, rating: "5.0" },
    { brand: "Rolex",         model: "Datejust",             color: "Two-Tone",          image: "assets/w03.png",  price: 10500, rating: "4.9" },
    { brand: "Audemars",      model: "Royal Oak",            color: "Silver/White",      image: "assets/w04.png",  price: 13500, rating: "4.7" },
    { brand: "IWC",           model: "Portugieser",          color: "White/Blue",        image: "assets/w05.png",  price: 9000,  rating: "4.8" },
    { brand: "Tag Heuer",     model: "Carrera",              color: "Silver Steel",      image: "assets/200.jpg",  price: 6200,  rating: "4.7" },
    { brand: "Tudor",         model: "Black Bay",            color: "Red Bezel",         image: "assets/201.png",  price: 7200,  rating: "4.6" },
    { brand: "Panerai",       model: "Luminor",              color: "Black Leather",     image: "assets/202.png",  price: 6800,  rating: "4.7" },
    { brand: "Breitling",     model: "Superocean",           color: "Orange/Black",      image: "assets/203.png",  price: 7400,  rating: "4.8" },
    { brand: "Rolex",         model: "Explorer",             color: "Black/Steel",       image: "assets/w01.png",  price: 10800, rating: "4.9" },
    { brand: "Hublot",        model: "Aerofusion",           color: "Skeleton",          image: "assets/w02.png",  price: 10200, rating: "4.7" },
    { brand: "Omega",         model: "Aqua Terra",           color: "Teal Dial",         image: "assets/w03.png",  price: 8600,  rating: "4.8" },
    { brand: "Cartier",       model: "Santos",               color: "Rose Gold/Silver",  image: "assets/w04.png",  price: 11500, rating: "4.7" },
    { brand: "Audemars",      model: "Offshore",             color: "Blue/Rose Gold",    image: "assets/w05.png",  price: 12500, rating: "4.9" },
    { brand: "Rolex",         model: "Oyster Perpetual",     color: "Yellow Dial",       image: "assets/200.jpg",  price: 9600,  rating: "4.8" },
    { brand: "IWC",           model: "Pilot",                color: "Black/Ceramic",     image: "assets/201.png",  price: 8200,  rating: "4.7" },
    { brand: "Tudor",         model: "Pelagos",              color: "Blue Titanium",     image: "assets/202.png",  price: 7600,  rating: "4.9" },
    { brand: "Panerai",       model: "Radiomir",             color: "Brown Dial",        image: "assets/203.png",  price: 9400,  rating: "4.8" },
    { brand: "Breitling",     model: "Chronomat",            color: "Gold Bezel",        image: "assets/w01.png",  price: 11800, rating: "4.7" },
    { brand: "Tag Heuer",     model: "Aquaracer",            color: "Green/Steel",       image: "assets/w02.png",  price: 6600,  rating: "4.6" },
    { brand: "Rolex",         model: "GMT Master II",        color: "Pepsi/Steel",       image: "assets/w03.png",  price: 11200, rating: "5.0" },
];

let products = distinctWatches.map((w, i) => ({
    id: i + 1,
    name: `${w.brand} ${w.model} - ${w.color}`,
    price: w.price,
    rating: w.rating,
    image: w.image
}));

async function renderProducts() {
    // Try to load admin-added products from Firebase
    try {
        const querySnapshot = await window.db.collection("adminProducts").get();
        let customProducts = [];
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            data.id = doc.id; // Assign document ID to avoid undefined product ID
            customProducts.push(data);
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
                <img src="${p.image}" alt="${p.name}" class="product-img" loading="lazy">
                <div class="product-info">
                    <h3>${p.name}</h3>
                    <div class="product-price">Rs. ${p.price.toLocaleString()}</div>
                    <div class="product-rating">${stars} <span style="color:var(--muted); font-size:0.75rem">(${p.rating})</span></div>
                    <button class="btn-add-cart" onclick="addToCart('${p.id}')">
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
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
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

// Render on load
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderProducts);
} else {
    renderProducts();
}
