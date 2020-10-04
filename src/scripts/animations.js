import { gsap } from 'gsap';

// Animate Dennis Mai on start, fade in to color\
function animateLogo() {
    gsap.from('#logo path', {
        duration: 1.5,
        attr: {
            fill: '#222222'
        },
        ease: "back.inOut(1.7)"
    });
}

function animateHero() {
    const heroTL = gsap.timeline();
    const heroCube = document.getElementById('hero-cube');

    // Animations for Hero Cube
    const heroAnimation = heroTL.to(heroCube, {
        duration: 7,
        rotationX: 360,
        rotationY: 720,
        ease: 'none',
        repeat: 10,
    });

    let paused = false;

    heroCube.addEventListener('click', function () {
        if (paused) {
            paused = false;
            return heroAnimation.play();
        }

        paused = true;
        return heroAnimation.pause();
    });
}

animateLogo();
animateHero();
