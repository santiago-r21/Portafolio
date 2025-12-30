
let starsVisible = true;
let starsAnimating = true;

const canvas = document.getElementById("starsCanvas");
const ctx = canvas.getContext("2d");

let stars = [];
let shootingStars = [];
let starsActive = true;
let canvasOpacity = 0;

// Ajustar tamaño
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// ===============================
// ESTRELLAS FIJAS
// ===============================
function createStars(count = 120) {
    stars = [];
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5 + 0.5,
            alpha: Math.random(),
            speed: Math.random() * 0.02 + 0.005
        });
    }
}
createStars();

// ===============================
// ESTRELLAS FUGACES
// ===============================
function createShootingStar() {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2 + 1.5; // VELOCIDAD ↓↓↓

    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 120 // MÁS TIEMPO EN PANTALLA
    };
}


// ===============================
// ANIMACIÓN
// ===============================
function animate() {
    requestAnimationFrame(animate);

    // Fade suave (evita parpadeo)
    const target = starsActive ? 1 : 0;
    canvasOpacity += (target - canvasOpacity) * 0.08;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (canvasOpacity < 0.01) return;

    ctx.globalAlpha = canvasOpacity;

    // Dibujar estrellas fijas
    for (let s of stars) {
        if (starsAnimating) {
    s.alpha += s.speed;
    if (s.alpha > 1 || s.alpha < 0) s.speed *= -1;
}


        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 204, 255, ${s.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#00ccff";
        ctx.fill();
    }

    // Crear estrella fugaz ocasional
   if (starsAnimating && Math.random() < 0.008) {
    shootingStars.push(createShootingStar());
}


    // Dibujar estrellas fugaces
    shootingStars = shootingStars.filter(star => {
        star.x += star.vx;
        star.y += star.vy;
        star.life++;

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.vx * 2, star.y - star.vy * 2);
        ctx.strokeStyle = "rgba(0, 204, 255, 0.8)";
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#00ccff";
        ctx.stroke();

        return star.life < star.maxLife;
    });
}

animate();

const bienvenidaSection = document.getElementById("Bienvenida");

const observerStars = new IntersectionObserver(
    ([entry]) => {
        starsAnimating = entry.isIntersecting;
    },
    { threshold: 0.6 }
);

observerStars.observe(bienvenidaSection);


// ===============================
// SLIDER HABILIDADES
// ===============================
const skillTrack = document.querySelector(".slide-track");
const skillSection = document.getElementById("Mis_Habilidades");

if (skillTrack && skillSection) {
    let wasIntersecting = false;

    const sliderObserver = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting && !wasIntersecting) {
                skillTrack.style.animationPlayState = "running";
                wasIntersecting = true;
            }
            if (!entry.isIntersecting) {
                skillTrack.style.animationPlayState = "paused";
                wasIntersecting = false;
            }
        },
        { threshold: 0.3 }
    );

    sliderObserver.observe(skillSection);
}
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-tabs .nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});
