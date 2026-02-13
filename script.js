document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const openingSection = document.getElementById('opening-section');
    const portraitSection = document.getElementById('portrait-section');
    const btn = document.getElementById('enter-btn');
    const audio = document.getElementById('bg-music');

    // --- Particle System (Floating Hearts) ---
    function createHeart() {
        if (!openingSection) return;

        const heart = document.createElement('div');
        heart.classList.add('particle');
        heart.innerText = Math.random() > 0.7 ? '💖' : '❤️'; // Random heart types

        // Random properties
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.left = Math.random() * 100 + 'vw';

        const duration = Math.random() * 4 + 3; // 3-7 seconds
        heart.style.animationDuration = duration + 's';

        openingSection.appendChild(heart);

        // Cleanup
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    // Generate hearts
    const heartInterval = setInterval(createHeart, 500);

    // --- Audio Handling ---
    if (audio) {
        audio.volume = 1.0;
        audio.currentTime = 90; // Start at chorus (approx 0:58)

        const playAudio = () => {
            // Already playing?
            if (!audio.paused) return;

            audio.play().then(() => {
                // Remove listeners if success
                ['click', 'mousemove', 'mousedown', 'touchstart', 'keydown'].forEach(evt => {
                    document.removeEventListener(evt, playAudio);
                });
            }).catch(e => console.log("Autoplay blocked, waiting for interaction", e));
        };

        // Try immediately
        playAudio();

        // Attach globally to catch any interaction
        ['click', 'mousemove', 'mousedown', 'touchstart', 'keydown'].forEach(evt => {
            document.addEventListener(evt, playAudio);
        });
    }

    // --- Transition Logic ---
    if (openingSection && portraitSection && btn) {
        btn.addEventListener('click', () => {
            // Stop generating hearts
            clearInterval(heartInterval);

            // Play audio if not playing
            if (audio && audio.paused) {
                audio.play();
            }

            // Fade out opening section
            openingSection.style.opacity = '0';

            // Wait for fade out, then switch
            setTimeout(() => {
                openingSection.style.display = 'none';

                // Show portrait section
                portraitSection.style.display = 'block';

                // Allow reflow for transition
                setTimeout(() => {
                    portraitSection.classList.add('visible');
                }, 50);

            }, 1000); // 1.5s matches CSS transition
        });
    }
});
