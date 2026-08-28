document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. FLOATING HEARTS & SPARKLES GENERATOR
       ========================================== */
    const particlesContainer = document.getElementById('particles-container');
    const particleTypes = ['💗', '💖', '✨', '🌸', '💕'];

    function createParticle() {
        if (!particlesContainer) return;
        const particle = document.createElement('div');
        particle.classList.add('floating-particle');
        particle.innerText = particleTypes[Math.floor(Math.random() * particleTypes.length)];
        
        const size = Math.random() * 15 + 10;
        const left = Math.random() * 100;
        const duration = Math.random() * 6 + 6;

        particle.style.left = `${left}vw`;
        particle.style.fontSize = `${size}px`;
        particle.style.animationDuration = `${duration}s`;

        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    setInterval(createParticle, 400);

    /* ==========================================
       2. OPENING SCREEN & MUSIC AUTO-PLAY INTERACTION
       ========================================== */
    const startBtn = document.getElementById('start-btn');
    const openingScreen = document.getElementById('opening-screen');
    const bgMusic = document.getElementById('bg-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const musicIcon = document.querySelector('.music-icon');

    startBtn.addEventListener('click', () => {
        openingScreen.classList.add('fade-out');
        
        // Memulai musik setelah interaksi user
        if (bgMusic) {
            bgMusic.play().then(() => {
                updateMusicUI(true);
            }).catch(() => {
                updateMusicUI(false);
            });
        }

        // Jalankan Typing Effect Hero saat halaman dibuka
        startTypingEffect();
    });

    function updateMusicUI(isPlaying) {
        if (!playPauseBtn || !musicIcon) return;
        if (isPlaying) {
            playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            musicIcon.classList.add('active');
        } else {
            playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            musicIcon.classList.remove('active');
        }
    }

    /* ==========================================
       3. MUSIC PLAYER CONTROLS
       ========================================== */
    if (playPauseBtn && bgMusic) {
        playPauseBtn.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                updateMusicUI(true);
            } else {
                bgMusic.pause();
                updateMusicUI(false);
            }
        });

        // Progress Bar
        const progressBar = document.getElementById('progress-bar');
        const progressContainer = document.getElementById('progress-container');

        bgMusic.addEventListener('timeupdate', () => {
            if (bgMusic.duration) {
                const progressPercent = (bgMusic.currentTime / bgMusic.duration) * 100;
                progressBar.style.width = `${progressPercent}%`;
            }
        });

        progressContainer.addEventListener('click', (e) => {
            const width = progressContainer.clientWidth;
            const clickX = e.offsetX;
            const duration = bgMusic.duration;
            bgMusic.currentTime = (clickX / width) * duration;
        });
    }

    /* ==========================================
       4. HERO TYPING EFFECT
       ========================================== */
    const typingElement = document.getElementById('typing-hero');
    const textToType = "Today is all about the most beautiful person in my world.";
    let typeIndex = 0;

    function startTypingEffect() {
        if (!typingElement) return;
        if (typeIndex < textToType.length) {
            typingElement.innerHTML += textToType.charAt(typeIndex);
            typeIndex++;
            setTimeout(startTypingEffect, 60);
        }
    }

    /* ==========================================
       5. NAVBAR MOBILE TOGGLE & SMOOTH SCROLLING
       ========================================== */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
            }
        });
    });

    // Active Navbar Link Indicator on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });

        // Back to Top Visibility
        const backToTopBtn = document.getElementById('back-to-top');
        if (backToTopBtn) {
            if (window.scrollY > 400) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        }
    });

    // Back to Top Click
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ==========================================
       6. SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER)
       ========================================== */
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger Counter Animation if card is visible
                if (entry.target.contains(document.querySelector('.stat-number'))) {
                    startCounters();
                }
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(reveal => observer.observe(reveal));

    /* ==========================================
       7. STATS COUNTER ANIMATION
       ========================================== */
    let counted = false;
    function startCounters() {
        if (counted) return;
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = target / 50;

            const updateCount = () => {
                count += speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
        counted = true;
    }

    /* ==========================================
       8. PHOTO GALLERY LIGHTBOX
       ========================================== */
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryItems.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = img.src;
        });
    });

    if (closeLightbox) {
        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.style.display = 'none';
            }
        });
    }

    /* ==========================================
       9. SPECIAL ENVELOPE INTERACTION
       ========================================== */
    const envelope = document.getElementById('envelope');
    if (envelope) {
        envelope.addEventListener('click', (e) => {
            envelope.classList.toggle('open');
            e.stopPropagation();
        });

        // Close letter when clicking outside
        document.addEventListener('click', (e) => {
            if (envelope.classList.contains('open') && !envelope.contains(e.target)) {
                envelope.classList.remove('open');
            }
        });
    }

    /* ==========================================
       10. SURPRISE MODAL & CONFETTI EFEK
       ========================================== */
    const surpriseBtn = document.getElementById('surprise-btn');
    const surpriseModal = document.getElementById('surprise-modal');
    const closeSurprise = document.querySelector('.close-surprise');

    if (surpriseBtn && surpriseModal) {
        surpriseBtn.addEventListener('click', () => {
            surpriseModal.style.display = 'flex';
            launchHeartConfetti();
        });
    }

    if (closeSurprise) {
        closeSurprise.addEventListener('click', () => {
            surpriseModal.style.display = 'none';
        });
    }

    /* Custom Canvas Heart Confetti Engine */
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    let particles = [];

    function resizeCanvas() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function launchHeartConfetti() {
        if (!canvas || !ctx) return;
        particles = [];
        for (let i = 0; i < 80; i++) {
            particles.push({
                x: canvas.width / 2,
                y: canvas.height / 2,
                size: Math.random() * 12 + 8,
                color: ['#ff758f', '#ffb7c5', '#c9184a', '#d4af37', '#ffffff'][Math.floor(Math.random() * 5)],
                vx: (Math.random() - 0.5) * 12,
                vy: (Math.random() - 0.5) * 12 - 4,
                rot: Math.random() * 360,
                opacity: 1
            });
        }
        animateConfetti();
    }

    function drawHeart(x, y, size, color, opacity, rot) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((rot * Math.PI) / 180);
        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;
        ctx.beginPath();
        const topCurveHeight = size * 0.3;
        ctx.moveTo(0, topCurveHeight);
        ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
        ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size);
        ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
        ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    let animationFrameId;
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let activeParticles = 0;

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.15; // Gravity
            p.opacity -= 0.008;
            p.rot += 2;

            if (p.opacity > 0) {
                activeParticles++;
                drawHeart(p.x, p.y, p.size, p.color, p.opacity, p.rot);
            }
        });

        if (activeParticles > 0) {
            animationFrameId = requestAnimationFrame(animateConfetti);
        } else {
            cancelAnimationFrame(animationFrameId);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
});