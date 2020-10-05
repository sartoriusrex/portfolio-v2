import { heroAnimation } from './animations';
import { enableScroll, disableScroll } from './enableDisableScrolling';

const sides = ['front', 'back', 'left', 'right', 'bottom'] // top needs some work yet;

const cube = {}
const captions = {}

// Add click events on all sides and their captions
sides.forEach(side => {
    cube[side] = document.querySelector(`.side.${side}`);
    captions[side] = document.querySelector(`#${side}`);

    //When the side of the cube is clicked, we make the caption visible by removing class invisible and adding class visible
    // Then we disable scroll and pause the animation
    cube[side].addEventListener('click', function () {
        captions[side].classList.remove('heroCaption-invisible');
        captions[side].classList.add('heroCaption-visible');
        disableScroll();
        heroAnimation.pause();
        window.scrollTo(0, 0);
    });

    // If the caption is visible, then it can be clicked
    // If that happens, then we remove visible and add invisible classes and enable scroll again and play the animation
    captions[side].addEventListener('click', function () {
        captions[side].classList.remove('heroCaption-visible');
        captions[side].classList.add('heroCaption-invisible');
        enableScroll();
        heroAnimation.play();
    });
})