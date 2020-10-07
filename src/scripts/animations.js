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

// Animations for star on cat dialogue

const starTL = gsap.timeline();
const star = document.getElementById('pink-star');

export const starAnimation = starTL.to(star, {
    duration: .75,
    rotation: 45,
    scale: 3,
    ease: 'none',
})

starAnimation.pause();

// Animations for cats -- export function to apply to a random cat on each click

const catTL = gsap.timeline();

export const animateCat = function (cat) {
    return catTL.to(cat, {
        duration: 1,
        scale: .6,
        rotate: 360,
        ease: 'power4.out',
        delay: .5,
    })
}

// Animate dialog box
const talkBoxTL = gsap.timeline();
const talkBox = document.querySelector('#cat-dialog');

export const talkBoxAnimation = talkBoxTL.to(talkBox, {
    duration: .25,
    scale: 1,
    ease: 'none',
    delay: .75,
})

talkBoxAnimation.pause();

animateLogo();
