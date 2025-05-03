document.addEventListener('DOMContentLoaded', function() {
    const flowerContainer = document.getElementById('flowerContainer');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const muteBtn = document.getElementById('muteBtn');
    const breatheTitle = document.querySelector('.breathe-title');
    const particlesContainer = document.getElementById('particles');
    
    // Audio elements
    const inhaleSound = document.getElementById('inhaleSound');
    const exhaleSound = document.getElementById('exhaleSound');
    const backgroundSound = document.getElementById('backgroundSound');
    
    // Set audio to loop (important for background sound)
    backgroundSound.loop = true;
    
    let isBreathing = false;
    let breathInterval;
    let isMuted = false;
    const petalCount = 5;
    
    // Create petals in closed position
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        const rotation = (i * (360 / petalCount)) - 90;
        petal.style.setProperty('--rotation', `${rotation}deg`);
        petal.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) translateY(-20px)`;
        flowerContainer.appendChild(petal);
    }
    
    function createParticles(isInhaling) {
        particlesContainer.innerHTML = '';
        const colors = isInhaling ? ['#4CAF50', '#8BC34A'] : ['#2196F3', '#03A9F4'];
        
        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            particle.style.width = `${Math.random() * 8 + 4}px`;
            particle.style.height = particle.style.width;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.bottom = '0';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.animationDuration = `${Math.random() * 4 + 4}s`;
            particle.style.animationDelay = `${Math.random() * 2}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    function playWithFallback(audioElement) {
        return audioElement.play().catch(error => {
            console.log("Audio playback failed:", error);
            // Show message to user if needed
            muteBtn.textContent = '▶ Click to Enable Sound';
            return Promise.reject(error);
        });
    }
    
    function bloomFlower() {
        flowerContainer.classList.remove('flower-closed');
        flowerContainer.classList.add('flower-open');
        breatheTitle.textContent = 'Breathe In...';
        
        if (!isMuted) {
            inhaleSound.currentTime = 0;
            playWithFallback(inhaleSound);
            
            backgroundSound.volume = 0.5;
            playWithFallback(backgroundSound).catch(e => {
                console.log("Background sound failed, will retry on user interaction");
            });
        }
        createParticles(true);
    }
    
    function closeFlower() {
        flowerContainer.classList.remove('flower-open');
        flowerContainer.classList.add('flower-closed');
        breatheTitle.textContent = 'Breathe Out...';
        
        if (!isMuted) {
            exhaleSound.currentTime = 0;
            playWithFallback(exhaleSound);
        }
        createParticles(false);
    }
    
    function startBreathing() {
        if (isBreathing) {
            stopBreathing();
            return;
        }
        
        isBreathing = true;
        startBtn.textContent = 'Restart';
        stopBtn.style.display = 'inline-block';
        
        // Start with closed flower
        flowerContainer.classList.add('flower-closed');
        
        // First breath starts immediately
        setTimeout(bloomFlower, 100);
        
        // Continuous breathing
        breathInterval = setInterval(() => {
            if (flowerContainer.classList.contains('flower-open')) {
                closeFlower();
            } else {
                bloomFlower();
            }
        }, 8000); // 4s inhale + 4s exhale
    }
    
    function stopBreathing() {
        isBreathing = false;
        clearInterval(breathInterval);
        breatheTitle.textContent = 'Paused';
        flowerContainer.classList.remove('flower-open', 'flower-closed');
        
        inhaleSound.pause();
        exhaleSound.pause();
        backgroundSound.pause();
    }
    
    function toggleMute() {
        isMuted = !isMuted;
        
        if (isMuted) {
            muteBtn.textContent = 'Sound Off';
            backgroundSound.pause();
        } else {
            muteBtn.textContent = 'Sound On';
            if (isBreathing) {
                // Attempt to play when unmuting
                playWithFallback(backgroundSound).then(() => {
                    backgroundSound.volume = 0.3;
                }).catch(e => {
                    muteBtn.textContent = '▶ Click to Enable';
                });
            }
        }
    }
    
    // Event listeners
    startBtn.addEventListener('click', startBreathing);
    stopBtn.addEventListener('click', stopBreathing);
    muteBtn.addEventListener('click', toggleMute);
    
    // Initialize with closed flower
    flowerContainer.classList.add('flower-closed');
    createParticles(true);
    
    // Audio permission handler - tries to unlock audio on first click
    function handleFirstInteraction() {
        // Try playing a silent sound to unlock audio
        const silentSound = new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...");
        silentSound.volume = 0;
        silentSound.play()
            .then(() => silentSound.remove())
            .catch(e => console.log("Silent audio failed:", e));
        
        // Remove this after first try
        document.body.removeEventListener('click', handleFirstInteraction);
        document.body.removeEventListener('touchstart', handleFirstInteraction);
    }
    
    // Try to unlock audio on any user interaction
    document.body.addEventListener('click', handleFirstInteraction);
    document.body.addEventListener('touchstart', handleFirstInteraction);
});