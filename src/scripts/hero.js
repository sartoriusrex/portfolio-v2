import { heroAnimation, starAnimation, animateCat } from './animations';
import { enableScroll, disableScroll } from './enableDisableScrolling';

const sides = ['front', 'back', 'left', 'right', 'bottom', 'top']

const cube = {}
const captions = {}

// Add click events on all sides and their captions
sides.forEach(side => {
    cube[side] = document.querySelector(`.side.${side}`);
    if (side !== 'top') captions[side] = document.querySelector(`#${side}`);

    //When the side of the cube is clicked, we make the caption visible by removing class invisible and adding class visible
    // Then we  pause the animation
    cube[side].addEventListener('click', function () {
        if (side === 'top') {
            const door = document.querySelector('.door');
            const catContainer = document.querySelector('.container--interactive-cat');
            const randNum = Math.floor(Math.random() * 6) + 1;
            const randomCat = document.querySelector(`#cat${randNum}`);

            // When the door opens, the random cat container scales up and the cat spins out, revealing the text
            door.addEventListener('click', function () {
                door.classList.add('open');

                catContainer.style.transform = 'scale(1)';
                catContainer.style.borderRadius = '0';
                animateCat(randomCat);
                starAnimation.play();

                disableScroll();
            });
        } else {
            captions[side].classList.remove('heroCaption-invisible');
            captions[side].classList.add('heroCaption-visible');
        }
        heroAnimation.pause();
        window.scrollTo(0, 0);
    });

    // If the caption is visible, then it can be clicked
    // If that happens, then we remove visible and add invisible classes and play the animation
    if (side !== 'top') captions[side].addEventListener('click', function () {
        captions[side].classList.remove('heroCaption-visible');
        captions[side].classList.add('heroCaption-invisible');
        heroAnimation.play();
    });
})