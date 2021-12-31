const burgerButton = document.getElementsByClassName('button--burger-menu')[0];
const burgerMenu = document.getElementsByClassName('ul--burger-menu')[0];

function toggleBurger() {
    let burgerValue = burgerButton.getAttribute('data-burger');

    if (burgerValue === 'closed') {
        burgerButton.setAttribute('data-burger', 'open');
        burgerButton.setAttribute('aria-expanded', true);
        burgerMenu.setAttribute('data-burger', 'open');
        disableScroll();
    } else {
        burgerButton.setAttribute('data-burger', 'closed');
        burgerButton.setAttribute('aria-expanded', false);
        burgerMenu.setAttribute('data-burger', 'closed');
        enableScroll();
    }

}

const burgerElements = document.querySelectorAll('[data-burger]');

burgerElements.forEach(el => el.addEventListener('click', () => toggleBurger()));
