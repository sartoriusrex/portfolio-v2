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
        rotate: 10,
        translateX: '1rem',
    }, {
        rotate: -1,
        translateX: '.5rem',
        ease: "bounce.out",
        duration: 1.1,
    });

    pDrop2.fromTo(aboutP2, {
        rotate: -7,
        translateX: '1rem',
    }, {
        rotate: 1.3,
        translateX: '-.1rem',
        ease: "bounce.out",
        duration: 1,
    });

    pDrop3.fromTo(aboutP3, {
        rotate: 8,
        translateX: '1rem',
    }, {
        rotate: -1.1,
        translateX: '.2rem',
        ease: "bounce.out",
        duration: 1.2,
    });
}

document.addEventListener("DOMContentLoaded", function () {
    /*
        If there's the intersection observer (all browsers except ie) then we use that to check the window.
    */


    if ("IntersectionObserver" in window) {
        // Callback just calls animateDrop and unobserves after it's called.
        let cb = function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animatePDrop();
                    observer.unobserve(entry.target);
                }
            })
        }

        // Make sure we're about 150px into the window to animate
        let opts = {
            rootMargin: '0px 0px -150px 0px',
        }

        let observer = new IntersectionObserver(cb, opts);
        observer.observe(aboutP3);
    } else {
        /*
            Polyfill for intersection Observer.
            We have to listen and remove events using setTimeout and measure the top of the object to the window.
            We also have to listen to orientation changes and resize events.
        */

        let ieTimout;

        function ieIOanimation() {
            if (ieTimout) clearTimeout(ieTimout);

            ieTimout = setTimeout(function () {
                let animated = false;
                if (aboutP3.offsetTop < (window.innerHeight + window.pageYOffset)) {
                    animatePDrop();
                    animated = true;
                }

                if (animated) {
                    document.removeEventListener("scroll", ieIOanimation);
                    window.removeEventListener("resize", ieIOanimation);
                    window.removeEventListener("orientationChange", ieIOanimation);
                }
            }, 20);
        }

        document.addEventListener("scroll", ieIOanimation);
        window.addEventListener("resize", ieIOanimation);
        window.addEventListener("orientationChange", ieIOanimation);
    }
});
