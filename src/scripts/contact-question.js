import { animateEgg } from './animations';

const emailLink = document.getElementById('email-link');
const submitBtn = document.getElementById('submit-answer');
const formEl = document.querySelector('form');
const animationContainer = document.querySelector('.container--contact-animation ');

submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const selected = Array.from(document.querySelectorAll('input')).filter(e => e.checked)[0];

    scrollTo(0, animationContainer.offsetTop - 100);

    formEl.classList.add('hidden');
    animateEgg();

    emailLink.href = `mailto: dmai.developer@gmail.com?subject=${selected.value}`;
});