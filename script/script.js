document.addEventListener('DOMContentLoaded', () => {
    
    const body = document.body;
    const directions = ['tl_br', 'tr_bl', 'bl_tr', 'br_tl'];

    // ----------------------------------------------------
    // 1. LÓGICA DE LAS ESTRELLAS
    // ----------------------------------------------------
    
    function generateTwinklingStars() {
        for (let i = 0; i < 100; i++) {
            let star = document.createElement('div');
            star.className = 'star';
            
            star.style.top = Math.random() * 100 + 'vh';
            star.style.left = Math.random() * 100 + 'vw';
            star.style.width = Math.random() * 3 + 1 + 'px';
            star.style.height = star.style.width;
            star.style.animationDelay = Math.random() * 4 + 's';
            body.appendChild(star);
        }
    }

    function generateShootingStars() {
        // Generamos más estrellas (de 8 a 15) para aumentar la aleatoriedad
        for (let i = 0; i < 15; i++) { 
            let shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';
            
            // dirección aleatoria y asignarla
            const directions = ['tl_br', 'tr_bl', 'bl_tr', 'br_tl'];
            const directionIndex = Math.floor(Math.random() * directions.length);
            const direction = directions[directionIndex];
            
            shootingStar.style.animationName = direction;
            
            // posición inicial aleatoria
            const randomLeft = Math.random() * 80 + 10; 
            shootingStar.style.left = randomLeft + 'vw'; 

            const randomTop = Math.random() * 80 + 10;
            shootingStar.style.top = randomTop + 'vh';
            
            // Parámetros de la animación
            shootingStar.style.animationDelay = Math.random() * 10 + 's'; 
            shootingStar.style.animationDuration = Math.random() * 3 + 3 + 's'; 

            body.appendChild(shootingStar);
        }
    }

    generateTwinklingStars();
    generateShootingStars();

}); // CIERRE FINAL DE DOMContentLoaded

const skillTrack = document.querySelector('.slide-track');
const skillSection = document.getElementById('Mis_Habilidades');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // El elemento está visible: Reanudar la animación
            skillTrack.style.animationPlayState = 'running';
        } else {
            // El elemento NO está visible: Pausar la animación
            skillTrack.style.animationPlayState = 'paused';
        }
    });
}, { threshold: 0.1 }); // Se activa cuando el 10% de la sección es visible

observer.observe(skillSection);