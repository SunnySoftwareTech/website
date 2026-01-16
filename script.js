// Detect dark mode and switch between sun and moon
function detectDarkMode() {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const celestialBody = document.getElementById('celestial-body');
    const craters = document.getElementById('craters');
    const speechBubble = document.getElementById('speech-bubble');
    
    if (darkMode) {
        // Switch to moon
        celestialBody.setAttribute('fill', 'url(#moonGradient)');
        if (craters) craters.style.display = 'block';
        if (speechBubble) speechBubble.style.display = 'block';
    } else {
        // Keep as sun
        celestialBody.setAttribute('fill', 'url(#sunGradient)');
        if (craters) craters.style.display = 'none';
        if (speechBubble) speechBubble.style.display = 'none';
    }
}

// Eye tracking - make pupils follow mouse
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    updateEyes();
});

function updateEyes() {
    const leftPupil = document.getElementById('left-pupil');
    const rightPupil = document.getElementById('right-pupil');
    
    if (!leftPupil || !rightPupil) return;
    
    // Get the sun/moon container position
    const container = document.querySelector('.sun-moon-container');
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    
    // Left eye position (center of left eye in SVG coordinates)
    const leftEyeX = containerRect.left + (160 / 400) * containerRect.width;
    const leftEyeY = containerRect.top + (140 / 200) * containerRect.height;
    
    // Right eye position
    const rightEyeX = containerRect.left + (240 / 400) * containerRect.width;
    const rightEyeY = containerRect.top + (140 / 200) * containerRect.height;
    
    // Calculate angle and distance for left pupil
    const leftAngle = Math.atan2(mouseY - leftEyeY, mouseX - leftEyeX);
    const leftMaxMove = 5; // Maximum movement in SVG units
    const leftMoveX = Math.cos(leftAngle) * leftMaxMove;
    const leftMoveY = Math.sin(leftAngle) * leftMaxMove;
    
    // Calculate angle and distance for right pupil
    const rightAngle = Math.atan2(mouseY - rightEyeY, mouseX - rightEyeX);
    const rightMaxMove = 5;
    const rightMoveX = Math.cos(rightAngle) * rightMaxMove;
    const rightMoveY = Math.sin(rightAngle) * rightMaxMove;
    
    // Update pupil positions
    leftPupil.setAttribute('cx', 160 + leftMoveX);
    leftPupil.setAttribute('cy', 140 + leftMoveY);
    
    rightPupil.setAttribute('cx', 240 + rightMoveX);
    rightPupil.setAttribute('cy', 140 + rightMoveY);
}

// Initialize on page load
window.addEventListener('load', () => {
    detectDarkMode();
    
    // Listen for dark mode changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectDarkMode);
});

// Add blinking animation
function blink() {
    const eyes = document.getElementById('eyes');
    if (!eyes) return;
    
    eyes.style.transition = 'transform 0.1s';
    eyes.style.transform = 'scaleY(0.1)';
    
    setTimeout(() => {
        eyes.style.transform = 'scaleY(1)';
    }, 150);
}

// Random blink every 3-7 seconds
function scheduleNextBlink() {
    const delay = 3000 + Math.random() * 4000;
    setTimeout(() => {
        blink();
        scheduleNextBlink();
    }, delay);
}

scheduleNextBlink();
