// Cursor-following sun animation
const sun = document.querySelector('.sun-container');
let mouseX = 0;
let mouseY = 0;
let sunX = 0;
let sunY = 0;

// Smooth animation parameters
const smoothFactor = 0.1;

// Track mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX - 75; // Center the sun (half of 150px width)
    mouseY = e.clientY - 75; // Center the sun (half of 150px height)
});

// Smooth animation loop
function animate() {
    // Smooth interpolation
    sunX += (mouseX - sunX) * smoothFactor;
    sunY += (mouseY - sunY) * smoothFactor;
    
    // Apply transformation
    sun.style.transform = `translate(${sunX}px, ${sunY}px)`;
    
    // Add slight rotation based on movement direction
    const angle = Math.atan2(mouseY - sunY, mouseX - sunX) * (180 / Math.PI);
    sun.style.transform = `translate(${sunX}px, ${sunY}px) rotate(${angle * 0.05}deg)`;
    
    requestAnimationFrame(animate);
}

// Initialize sun position to center of screen
window.addEventListener('load', () => {
    mouseX = window.innerWidth / 2 - 75;
    mouseY = window.innerHeight / 2 - 75;
    sunX = mouseX;
    sunY = mouseY;
    animate();
});

// Add bounce effect when cursor stops
let lastMoveTime = Date.now();
let bounceInterval;

document.addEventListener('mousemove', () => {
    lastMoveTime = Date.now();
    clearInterval(bounceInterval);
});

function checkIdle() {
    if (Date.now() - lastMoveTime > 3000) {
        // Sun does a little bounce when idle
        const eyes = document.querySelectorAll('#eyes ellipse');
        eyes.forEach(eye => {
            eye.style.animation = 'none';
            setTimeout(() => {
                eye.style.animation = 'blink 5s infinite';
            }, 10);
        });
    }
}

setInterval(checkIdle, 1000);

// Add parallax effect to sun rays based on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rays = document.querySelector('#rays');
    if (rays) {
        rays.style.transform = `rotate(${scrolled * 0.1}deg)`;
    }
});

// Add interaction when clicking near the sun
document.addEventListener('click', (e) => {
    const sunRect = sun.getBoundingClientRect();
    const sunCenterX = sunRect.left + sunRect.width / 2;
    const sunCenterY = sunRect.top + sunRect.height / 2;
    
    const distance = Math.sqrt(
        Math.pow(e.clientX - sunCenterX, 2) + 
        Math.pow(e.clientY - sunCenterY, 2)
    );
    
    // If clicked within 200px of sun center
    if (distance < 200) {
        // Make the sun do a happy wiggle
        sun.style.transition = 'transform 0.1s ease';
        sun.style.transform = `translate(${sunX}px, ${sunY}px) scale(1.2)`;
        
        setTimeout(() => {
            sun.style.transform = `translate(${sunX}px, ${sunY}px) scale(1)`;
            setTimeout(() => {
                sun.style.transition = '';
            }, 100);
        }, 100);
    }
});
