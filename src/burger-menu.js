const burgerButton = document.getElementsByClassName('button--burger-menu')[0];
const burgerMenu = document.getElementsByClassName('ul--burger-menu')[0];

function toggleBurger() {
    let burgerValue = burgerButton.getAttribute('data-burger');

    if (burgerValue === 'closed') {
        burgerButton.setAttribute('data-burger', 'open');
        burgerMenu.setAttribute('data-burger', 'open');
    } else {
        burgerButton.setAttribute('data-burger', 'closed');
        burgerMenu.setAttribute('data-burger', 'closed');
    }

}

const burgerElements = document.querySelectorAll('[data-burger]');

burgerElements.forEach(el => el.addEventListener('click', () => toggleBurger()));
