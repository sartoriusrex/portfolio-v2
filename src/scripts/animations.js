import { gsap } from 'gsap';
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

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
    if (aboutP1) {

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
    }
});

// whole egg
const eggHatcher = document.querySelector('#egg-hatcher');

// shell pieces (not bottom)
const shellPiece1 = document.querySelector('#path918');
const shellPiece2 = document.querySelector('#path920');
const shellPiece3 = document.querySelector('#path922');
const shellPiece4 = document.querySelector('#path924');
const shellPiece5 = document.querySelector('#path926');
const shellPiece6 = document.querySelector('#path928');
const shellPiece7 = document.querySelector('#path930');
const shellPiece8 = document.querySelector('#path932');
const shellPiece9 = document.querySelector('#path938');
const shellPiece10 = document.querySelector('#path940');
const shellPiece11 = document.querySelector('#path942');
const shellPiece12 = document.querySelector('#path944');
const shellPiece13 = document.querySelector('#path946');
const shellPiece14 = document.querySelector('#path948');
const shellPiece15 = document.querySelector('#path950');
console.log(shellPiece2);
// entire chick
const chick = document.querySelector('#chick');

// pieces
const piece15 = document.querySelector('#path952');
const piece16 = document.querySelector('#path956');
const piece17 = document.querySelector('#path954');
const piece18 = document.querySelector('#path956');
const piece19 = document.querySelector('#path958');
const piece20 = document.querySelector('#path960');
const piece21 = document.querySelector('#path962');
const piece22 = document.querySelector('#path964');
const piece23 = document.querySelector('#path966');
const piece24 = document.querySelector('#path968');
const piece25 = document.querySelector('#path970');
const piece26 = document.querySelector('#path1021');
const piece27 = document.querySelector('#path1023');
const piece28 = document.querySelector('#path1049');
const piece29 = document.querySelector('#path1023-0');
const piece30 = document.querySelector('#path984');
const piece31 = document.querySelector('#path986');
const piece32 = document.querySelector('#path1009');
const piece33 = document.querySelector('#path1011');
const piece34 = document.querySelector('#path1013');
const piece35 = document.querySelector('#path1015');
const piece36 = document.querySelector('#path1017');
const piece37 = document.querySelector('#path1019');
const piece38 = document.querySelector('#path988-2');
const piece39 = document.querySelector('#path1007');
const piece40 = document.querySelector('#path988');
const piece41 = document.querySelector('#path974');
const piece42 = document.querySelector('#path1005');
const piece43 = document.querySelector('#path978');
const piece44 = document.querySelector('#path980');
const piece45 = document.querySelector('#path982');

const eggTL = gsap.timeline();
const shellOptions = {
    duration: .05,
    ease: 'none',
    attr: {
        stroke: "#DE38C8"
    }
}


export const animateEgg = function () {
    eggTL.to(eggHatcher, {
        delay: .1,
        translateX: 0,
        duration: 1.2,
        ease: 'bounce.out',
    }).to(eggHatcher, {
        delay: -1.1,
        scale: 1,
        ease: 'none',
        duration: .2,
    }).to(shellPiece1,
        shellOptions
    ).to(shellPiece2,
        shellOptions
    ).to(shellPiece3,
        shellOptions
    ).to(shellPiece4,
        shellOptions
    ).to(shellPiece5,
        shellOptions
    ).to(shellPiece6,
        shellOptions
    ).to(shellPiece7,
        shellOptions
    ).to(shellPiece8,
        shellOptions
    ).to(shellPiece9,
        shellOptions
    ).to(shellPiece10,
        shellOptions
    ).to(shellPiece11,
        shellOptions
    ).to(shellPiece12,
        shellOptions
    ).to(shellPiece13,
        shellOptions
    ).to(shellPiece14,
        shellOptions
    ).to(shellPiece15,
        shellOptions
    )
}