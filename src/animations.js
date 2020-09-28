import { gsap } from 'gsap';

gsap.from('path', {
    duration: 5.5,
    // attr: {
    //     transform: 'matrix(0,1,0,1,0,0)'
    // },
    attr: {
        fill: 'black'
    },
    ease: "rough ({template: none.out, strength: 10, points: 50,taper: 'out', randomize: false, clamp: false })"
});

