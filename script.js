document.addEventListener('DOMContentLoaded', () => {

    const revealElements = document.querySelectorAll('.glass, .hero, footer');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    });

    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all .6s ease";
        observer.observe(el);
    });

    const canvas = document.getElementById("bg-canvas");
    const ctx = canvas.getContext("2d");

    let W, H;
    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();

    let particles = [];
    for (let i = 0; i < 70; i++) {
        particles.push({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - .5) * .4,
            vy: (Math.random() - .5) * .4,
            size: Math.random() * 2 + 1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, W, H);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = W;
            if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H;
            if (p.y > H) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(0,210,255,0.4)";
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener("resize", resize);
});
