import { gsap } from 'gsap';

gsap.from('#logo path', {
    duration: 1.5,
    attr: {
        fill: '#222222'
    },
    // ease: "rough ({template: none.out, strength: 10, points: 50,taper: 'out', randomize: false, clamp: false })"
    ease: "back.inOut(1.7)"
});

// const heroTL = gsap.timeline({
// repeat: infinite,
// })

gsap.to('#hero-cube', {
    duration: 7,
    rotationX: 360,
    rotationY: 360,
    ease: 'none',
    repeat: 2,
})

