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
    duration: .5,
    rotation: 45,
    scale: 3,
    ease: 'none',
})

starAnimation.pause();


// Animations for cats -- export function to apply to a random cat on each click
// Cat swirls in, then dialog box opens, and then text displays;

const catTL = gsap.timeline();
const talkBox = document.querySelector('#cat-dialog');
const talkDialog = document.querySelector('.container--talk-box-text');

export const animateCat = function (cat) {
    return catTL.fromTo(cat, {
        scale: 0,
        rotate: -360,
    }, {
        duration: .75,
        scale: .6,
        rotate: 360,
        ease: 'power4.out',
        delay: .5,
    }).to(talkBox, {
        duration: .25,
        scale: 1,
        ease: 'none',
    },
        ">-.25"
    ).to(talkDialog, {
        duration: .25,
        scale: 1,
        ease: 'none',
    })

}

animateLogo();

// Animating the about this place paragraph drop bounces
const pDrop1 = gsap.timeline();
const pDrop2 = gsap.timeline();
const pDrop3 = gsap.timeline();

const aboutP1 = document.querySelector('#my-corner');
const aboutP2 = document.querySelector('#explore');
const aboutP3 = document.querySelector('#hope');

export const animatePDrop = function () {
    pDrop1.fromTo(aboutP1, {
        rotate: 0,
        translateX: 0
    }, {
        rotate: -1,
        translateX: '.5rem'
    });

    pDrop2.fromTo(aboutP2, {
        rotate: 0,
        translateX: 0
    }, {
        rotate: 1.3,
        translateX: '-.1rem'
    });

    pDrop3.fromTo(aboutP3, {
        rotate: 0,
        translateX: 0
    }, {
        rotate: -1.1,
        translateX: '.2rem'
    });
}
