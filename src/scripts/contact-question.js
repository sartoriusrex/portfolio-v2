import { animateEgg } from './animations';

const emailLink = document.getElementById('email-link');
const submitBtn = document.getElementById('submit-answer');
const formEl = document.querySelector('form');
const animationContainer = document.querySelector('.container--contact-animation ');
const eggHatcherContainer = document.querySelector('#container--egg-hatcher');

submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const selected = Array.from(document.querySelectorAll('input')).filter(e => e.checked)[0];

    formEl.classList.add('hidden');
    eggHatcherContainer.classList.add('shown');

    console.log(eggHatcherContainer.scrollTop);
    console.log(eggHatcherContainer.clientHeight);

    let scrollToPosition = eggHatcherContainer.scrollTop + eggHatcherContainer.clientHeight;
    window.scrollTo(0, scrollToPosition);
    // eggHatcherContainer.scrollTop = eggHatcherContainer.scrollHeight + 150;
    animateEgg();

    emailLink.href = `mailto: dmai.developer@gmail.com?subject=${selected.value}`;
});