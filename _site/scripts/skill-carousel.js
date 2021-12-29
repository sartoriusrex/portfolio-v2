const categories = Array.from(document.querySelectorAll('.skill-category'));

const leftButton = document.querySelector('.left-skill');
const rightButton = document.querySelector('.right-skill');
let current = 0;
const limit = categories.length;

export const toggleVisible = () => {
    let classList = Array.from(categories[current].classList);
    if (classList.includes('visible')) {
        categories[current].classList.remove('visible');
    } else {
        categories[current].classList.add('visible');
    }
}

export function clickRight() {
    rightButton.addEventListener('click', () => {
        toggleVisible();
        if (current + 1 === limit) {
            current = 0;
        } else {
            current += 1;
        }
        toggleVisible();
    })
}

export function clickLeft() {
    leftButton.addEventListener('click', () => {
        toggleVisible();
        if (current - 1 < 0) {
            current = limit - 1;
        } else {
            current -= 1;
        }
        toggleVisible();
    });
}

