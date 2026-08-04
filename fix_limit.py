import os

def apply_limit_shop_js():
    filepath = 'c:/new property project/frontend/js/shop.js'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to change the addToCart function to check for the limit.
    original_func = '''window.addToCart = function(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = shopProducts.find(p => p.id === productId);
    if(product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.href = "cart.html";
    }
}'''
    
    new_func = '''window.addToCart = function(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let currentCount = cart.filter(item => item.id === productId).length;
    
    if (currentCount >= 10) {
        alert("You cannot add more than 10 of this watch to your cart.");
        return;
    }
    
    let product = shopProducts.find(p => p.id === productId);
    if(product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.href = "cart.html";
    }
}'''
    
    if original_func in content:
        content = content.replace(original_func, new_func)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print('Updated shop.js limit')
    else:
        print('Could not find exact function in shop.js')

def apply_limit_product_html():
    filepath = 'c:/new property project/frontend/product.html'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_func = '''        function addToCartSingle() {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push({
                id: "prod_001",
                name: "Rolex Submariner Date",
                price: 14500,
                image: "assets/200.jpg"
            });
            localStorage.setItem("cart", JSON.stringify(cart));
            window.location.href = "cart.html";
        }'''
        
    new_func = '''        function addToCartSingle() {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let currentCount = cart.filter(item => item.id === "prod_001").length;
            
            if (currentCount >= 10) {
                alert("You cannot add more than 10 of this watch to your cart.");
                return;
            }
            
            cart.push({
                id: "prod_001",
                name: "Rolex Submariner Date",
                price: 14500,
                image: "assets/200.jpg"
            });
            localStorage.setItem("cart", JSON.stringify(cart));
            window.location.href = "cart.html";
        }'''
        
    if original_func in content:
        content = content.replace(original_func, new_func)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print('Updated product.html limit')
    else:
        print('Could not find exact function in product.html')

apply_limit_shop_js()
apply_limit_product_html()
