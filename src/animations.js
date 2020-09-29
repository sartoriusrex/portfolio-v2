import { gsap } from 'gsap';

gsap.from('#logo path', {
    duration: 1.5,
    attr: {
        fill: 'black'
    },
    ease: "rough ({template: none.out, strength: 10, points: 50,taper: 'out', randomize: false, clamp: false })"
});

