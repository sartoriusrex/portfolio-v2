import { animateEgg } from './animations';

const emailLink = document.getElementById('email-link');
const submitBtn = document.getElementById('submit-answer');
const formEl = document.querySelector('form');
const animationContainer = document.querySelector('.container--contact-animation ');

submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const selected = Array.from(document.querySelectorAll('input')).filter(e => e.checked)[0];

    formEl.classList.add('hidden');
    emailLink.classList.add('shown');

    let scrollToPosition = animationContainer.scrollHeight;
    window.scrollTo(0, scrollToPosition);
    animateEgg();

    emailLink.href = `mailto: dmai.developer@gmail.com?subject=${selected.value}`;
});