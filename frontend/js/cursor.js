// cursor.js — Bulletproof gold cursor for all pages
(function() {
    function initCursor() {
        // Avoid duplicates
        if (document.getElementById('gc')) return;

        // Create cursor elements
        var c = document.createElement('div');
        c.id = 'gc';
        c.className = 'cursor';

        var f = document.createElement('div');
        f.id = 'gcf';
        f.className = 'cursor-follower';

        document.body.appendChild(c);
        document.body.appendChild(f);

        var mouseX = window.innerWidth / 2;
        var mouseY = window.innerHeight / 2;
        var followerX = mouseX;
        var followerY = mouseY;

        // Track mouse
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            // Move main cursor instantly
            c.style.transform = 'translate(' + (mouseX - 6) + 'px, ' + (mouseY - 6) + 'px)';
        }, { passive: true });

        // Smooth follower animation
        function animateFollower() {
            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;
            f.style.transform = 'translate(' + (followerX - 18) + 'px, ' + (followerY - 18) + 'px)';
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Grow on hover
        document.addEventListener('mouseover', function(e) {
            var el = e.target.closest('a, button, [onclick], input, select, textarea, .product-card, .featured-card, .btn-add-cart, .checkout-btn, .whatsapp-btn');
            if (el) {
                c.style.transform = 'translate(' + (mouseX - 6) + 'px, ' + (mouseY - 6) + 'px) scale(2.2)';
                f.style.opacity = '1';
                f.style.borderWidth = '2px';
            }
        });

        document.addEventListener('mouseout', function(e) {
            var el = e.target.closest('a, button, [onclick], input, select, textarea, .product-card, .featured-card, .btn-add-cart, .checkout-btn, .whatsapp-btn');
            if (el) {
                c.style.transform = 'translate(' + (mouseX - 6) + 'px, ' + (mouseY - 6) + 'px) scale(1)';
                f.style.opacity = '0.7';
                f.style.borderWidth = '2px';
            }
        });

        // Mouse click pulse
        document.addEventListener('mousedown', function() {
            c.style.transform = 'translate(' + (mouseX - 6) + 'px, ' + (mouseY - 6) + 'px) scale(0.8)';
        });
        document.addEventListener('mouseup', function() {
            c.style.transform = 'translate(' + (mouseX - 6) + 'px, ' + (mouseY - 6) + 'px) scale(1)';
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCursor);
    } else {
        initCursor();
    }
})();
