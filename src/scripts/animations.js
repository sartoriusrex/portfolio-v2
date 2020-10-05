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


const heroTL = gsap.timeline();
const heroCube = document.getElementById('hero-cube');

// Animations for Hero Cube
export const heroAnimation = heroTL.to(heroCube, {
    duration: 8,
    rotationX: 360,
    rotationY: 720,
    ease: 'none',
    repeat: 20,
});


animateLogo();
