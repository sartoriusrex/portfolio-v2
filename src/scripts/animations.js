import { gsap } from 'gsap';
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

// Animate Dennis Mai on start, fade in to color\
export function animateLogo() {
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
    repeat: -1,
});

// Animations for star on cat dialogue

const starTL = gsap.timeline();
const star = document.getElementById('pink-star');

export const starAnimation = starTL.to(star, {
    duration: .5,
    rotation: 45,
    scale: 3,
    ease: 'none',
});


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
        scale: .4,
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

const bunnyCatTL = gsap.timeline({ repeat: -1 });
const bunnyCat = document.querySelector('#cat-bunny');
const bunnyLeftEar = document.querySelector('#leftEar');
const bunnyRighttEar = document.querySelector('#rightEar');

export const animateBunny = function () {
    return bunnyCatTL
        .fromTo(bunnyCat, {
            translateX: '-5rem',
        }, {
            translateX: '10rem',
            translateY: '-5rem',
            ease: 'none',
            duration: 1,
        })
        .addLabel('theWalk')
        .to(bunnyCat, {
            rotateY: '180deg',
            duration: .1,
        })
        .to(bunnyCat, {
            translateX: '-5rem',
            duration: 2,
        })
        .to(bunnyCat, {
            translateY: '0rem',
            duration: 1,
        })
        .to(bunnyCat, {
            rotateY: '0deg',
            duration: .1,
        })
        .to(bunnyCat, {
            translateX: '5rem',
            duration: 1,
        })
        .to(bunnyCat, {
            rotateY: '180deg',
            duration: .1,
        })
        .to(bunnyCat, {
            translateX: '-5rem',
            duration: .5,
        })
        .to(bunnyCat, {
            rotateY: '0deg',
            duration: .2,
        })
}

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

export const fallingParagraphs = function () {
    return (
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
        })
    )
}

const projectItems = document.querySelectorAll('.project-item');

export const appearingProjects = function () {
    return (
        document.addEventListener("DOMContentLoaded", function () {
            if ('IntersectionObserver' in window) {
                let cb = (entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const item = entry.target;

                            item.classList.remove('hidden');

                            projectObserver.unobserve(item);
                        }
                    })
                }

                let opts = {
                    rootMargin: '0px 0px -250px 0px',
                }

                const projectObserver = new IntersectionObserver(cb, opts);

                projectItems.forEach(item => projectObserver.observe(item));
            } else {
                projectItems.forEach(item => item.classList.remove('.hidden'));
            }
        })
    )
}

// whole egg
const eggHatcher = document.querySelector('#egg-hatcher');

// shell pieces (not bottom)
const topShell = document.querySelectorAll('#shell path:not(#shell-bottom');
const shellObject = {};

let topShellPieces = Array.from(topShell).filter(piece => piece.id.slice(0, 1) !== "p");

topShellPieces.forEach((piece, idx) => shellObject[idx] = piece);

// entire chick
const chick = document.querySelector('#chick');

const leftEar = document.querySelector('#leftEar');
const rightEar = document.querySelector('#rightEar');

const eyeLidLeft = document.querySelector('#eyelidLeft');
const eyeLidRight = document.querySelector('#eyelidRight');

const shellOptions = {
    duration: .05,
    ease: 'none',
    attr: {
        stroke: "#DE38C8",
    }
}
const shellOptions2 = { ...shellOptions, ...{ delay: -.5 } };

const emailLink = document.querySelector('#email-link');

function showEmail() {
    emailLink.classList.add('shown');
}

const eggTL = gsap.timeline({
    paused: true,
    onComplete: showEmail
});

function returnPathOption(pathId) {
    let durationLow = Math.floor(Math.random() * .2) + .7;
    let durationMid = Math.floor(Math.random() * .2) + .9;
    let durationHigh = Math.floor(Math.random() * .2) + 1.1;
    let delay = Math.random() * 0.025;
    let duration;

    if (pathId.slice(0, 3) === "low") {
        duration = durationLow;
    } else if (pathId.slice(0, 3) === "mid") {
        duration = durationMid;
    } else {
        duration = durationHigh;
    }

    return {
        motionPath: {
            path: `#p${pathId}`,
            autoRotate: true,
            align: "self",
        },
        scale: 0.9,
        duration: duration,
        ease: "bounce.out",
        delay: delay,
    }
}

const pathOptions = {}
topShellPieces.forEach((piece, idx) => {
    pathOptions[idx] = returnPathOption(piece.id);;
})

export const animateEgg = function () {
    return eggTL
        .addLabel('start')
        .to(chick, {
            scale: 0,
            duration: .001
        }, 'start')
        .to(eyeLidLeft,
            {
                scale: 0,
                duration: .001
            }, 'start')
        .to(eyeLidRight,
            {
                scale: 0,
                duration: .001
            }, 'start')
        .to(eggHatcher, {
            delay: .1,
            translateX: 0,
            duration: 1.2,
            ease: 'bounce.out',
        })
        .addLabel("shake")
        .to(eggHatcher, {
            delay: -1.1,
            scale: 1,
            ease: 'none',
            duration: .2,
        }).fromTo(
            eggHatcher,
            { rotate: "3deg" },
            {
                rotate: "-3deg",
                duration: .1,
                ease: 'none',
                repeat: 3
            },
            "shake"
        )
        .to(eggHatcher, { rotate: "0deg", duration: .1 })
        .to(shellObject[0], shellOptions, "shake+=.5") // we crack the egg
        .to(shellObject[1], shellOptions2)
        .to(shellObject[2], shellOptions2)
        .to(shellObject[3], shellOptions)
        .to(shellObject[4], shellOptions2)
        .to(shellObject[5], shellOptions)
        .to(shellObject[6], shellOptions)
        .to(shellObject[7], shellOptions)
        .to(shellObject[8], shellOptions)
        .to(shellObject[9], shellOptions)
        .to(shellObject[10], shellOptions)
        .to(shellObject[11], shellOptions)
        .to(shellObject[12], shellOptions)
        .to(shellObject[13], shellOptions)
        .to(shellObject[14], shellOptions)
        .addLabel("explode") // the egg explodes
        .to(shellObject[0], pathOptions[0], "explode")
        .to(shellObject[1], pathOptions[1], "explode")
        .to(shellObject[2], pathOptions[2], "explode")
        .to(shellObject[3], pathOptions[3], "explode")
        .to(shellObject[4], pathOptions[4], "explode")
        .to(shellObject[5], pathOptions[5], "explode")
        .to(shellObject[6], pathOptions[6], "explode")
        .to(shellObject[7], pathOptions[7], "explode")
        .to(shellObject[8], pathOptions[8], "explode")
        .to(shellObject[9], pathOptions[9], "explode")
        .to(shellObject[10], pathOptions[10], "explode")
        .to(shellObject[11], pathOptions[11], "explode")
        .to(shellObject[12], pathOptions[12], "explode")
        .to(shellObject[13], pathOptions[13], "explode")
        .to(shellObject[14], pathOptions[14], "explode")
        .addLabel("appear")
        .to(chick, {
            motionPath: {
                path: '#chickPath',
                align: 'self',
                offsetX: 150,
            },
            transformOrigin: "top",
            scale: .23,
            ease: 'power1.in',
            duration: .2,
            delay: -.1
        }, "explode")
        .addLabel('wiggleEars')
        .fromTo(leftEar,
            { skewX: 0 },
            {
                duration: .1,
                ease: 'none',
                skewX: '2deg',
                repeat: 2
            },
            'wiggleEars')
        .to(leftEar,
            {
                skewX: 0,
                duration: .1
            })
        .fromTo(rightEar,
            { skewX: 0 },
            {
                duration: .1,
                ease: 'none',
                skewX: '-2deg',
                repeat: 2
            },
            'wiggleEars')
        .to(rightEar,
            {
                skewX: 0,
                duration: .1,
                delay: -.1
            })
        .to('#eyelashes', {
            scale: 0,
            duration: 0.001
        })
        .fromTo(eyeLidLeft,
            { scale: 1 },
            {
                scale: 0,
                duration: .3,
                transformOrigin: 'top',
                repeat: 1
            }, 'wiggleEars')
        .fromTo(eyeLidRight,
            { scale: 1 },
            {
                scale: 0,
                duration: .3,
                transformOrigin: 'top',
                repeat: 1
            }, 'wiggleEars')
        .to('#eyelashes', {
            scale: 1,
            duration: 0.001,
            delay: -.1
        }).play()
}