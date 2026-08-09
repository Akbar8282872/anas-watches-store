// Minimal bulletproof cursor — no event interference
(function () {
    function init() {
        // Dot cursor
        var c = document.createElement('div');
        c.style.cssText = [
            'position:fixed',
            'width:12px',
            'height:12px',
            'background:#c9a84c',
            'border-radius:50%',
            'pointer-events:none',
            'z-index:999999',
            'top:0',
            'left:0',
            'box-shadow:0 0 10px rgba(201,168,76,0.9),0 0 20px rgba(201,168,76,0.4)',
            'transform:translate(-100px,-100px)',
            'transition:none'
        ].join(';');

        // Ring follower
        var f = document.createElement('div');
        f.style.cssText = [
            'position:fixed',
            'width:34px',
            'height:34px',
            'border:2px solid #c9a84c',
            'border-radius:50%',
            'pointer-events:none',
            'z-index:999998',
            'top:0',
            'left:0',
            'opacity:0.65',
            'transform:translate(-100px,-100px)',
            'transition:none'
        ].join(';');

        document.body.appendChild(c);
        document.body.appendChild(f);

        var mx = 0, my = 0, fx = 0, fy = 0;

        // Track mouse — passive listener, zero interference with clicks
        document.addEventListener('mousemove', function (e) {
            mx = e.clientX;
            my = e.clientY;
            // Dot follows instantly
            c.style.transform = 'translate(' + (mx - 6) + 'px,' + (my - 6) + 'px)';
        }, { passive: true });

        // Ring follows smoothly via rAF
        (function loop() {
            fx += (mx - fx) * 0.12;
            fy += (my - fy) * 0.12;
            f.style.transform = 'translate(' + (fx - 17) + 'px,' + (fy - 17) + 'px)';
            requestAnimationFrame(loop);
        })();
    }

    // Run as early as possible
    if (document.body) {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
})();
