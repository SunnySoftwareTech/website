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

// Eye tracking - make line eyes rotate to follow mouse
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    updateEyes();
});

function updateEyes() {
    const leftLine = document.getElementById('left-eye-line');
    const leftTop = document.getElementById('left-top-circle');
    const leftBottom = document.getElementById('left-bottom-circle');
    const rightLine = document.getElementById('right-eye-line');
    const rightTop = document.getElementById('right-top-circle');
    const rightBottom = document.getElementById('right-bottom-circle');
    
    if (!leftLine || !rightLine) return;
    
    // Get the sun/moon container position
    const container = document.querySelector('.sun-moon-bottom');
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    
    // Left eye position (center of left eye in SVG coordinates)
    const leftEyeX = containerRect.left + (240 / 600) * containerRect.width;
    const leftEyeY = containerRect.top + (175 / 300) * containerRect.height;
    
    // Right eye position
    const rightEyeX = containerRect.left + (360 / 600) * containerRect.width;
    const rightEyeY = containerRect.top + (175 / 300) * containerRect.height;
    
    // Calculate angle for left eye
    const leftAngle = Math.atan2(mouseY - leftEyeY, mouseX - leftEyeX);
    const leftRotation = leftAngle * (180 / Math.PI) + 90; // Convert to degrees and adjust
    
    // Calculate angle for right eye
    const rightAngle = Math.atan2(mouseY - rightEyeY, mouseX - rightEyeX);
    const rightRotation = rightAngle * (180 / Math.PI) + 90;
    
    // Apply rotation to left eye elements around center point (240, 175)
    const leftEyeCenter = '240 175';
    leftLine.setAttribute('transform', `rotate(${leftRotation} ${leftEyeCenter})`);
    leftTop.setAttribute('transform', `rotate(${leftRotation} ${leftEyeCenter})`);
    leftBottom.setAttribute('transform', `rotate(${leftRotation} ${leftEyeCenter})`);
    
    // Apply rotation to right eye elements around center point (360, 175)
    const rightEyeCenter = '360 175';
    rightLine.setAttribute('transform', `rotate(${rightRotation} ${rightEyeCenter})`);
    rightTop.setAttribute('transform', `rotate(${rightRotation} ${rightEyeCenter})`);
    rightBottom.setAttribute('transform', `rotate(${rightRotation} ${rightEyeCenter})`);
}

// Initialize on page load
window.addEventListener('load', () => {
    detectDarkMode();
    
    // Listen for dark mode changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectDarkMode);
});

// Blinking is now handled by CSS animation
// Eyes blink automatically with the animation defined in CSS
