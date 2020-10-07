import { heroAnimation, starAnimation, animateCat } from './animations';
import { enableScroll, disableScroll } from './enableDisableScrolling';

const sides = ['front', 'back', 'left', 'right', 'bottom', 'top']

const cube = {}
const captions = {}

const getFact = async function () {
    return fetch('https://catfact.ninja/fact?max_length=200').then(response => {
        return response.json();
    }).then(data => data.fact)
}

const updateFact = async function () {
    const factContainer = document.querySelector('#cat-fact');
    const fact = await getFact();

    factContainer.innerText = fact;
}

// Add click events on all sides and their captions
sides.forEach(side => {
    cube[side] = document.querySelector(`.side.${side}`);
    if (side !== 'top') captions[side] = document.querySelector(`#${side}`);

    const door = document.querySelector('.door');
    const catContainer = document.querySelector('.container--interactive-cat');
    const allCats = document.querySelectorAll('.cat');
    let randNum;
    let randCat;

    //When the side of the cube is clicked, we make the caption visible by removing class invisible and adding class visible
    // Then we  pause the animation
    cube[side].addEventListener('click', function () {
        if (side === 'top') {
            // When the door opens, the random cat container scales up and the cat spins out, revealing the text
            door.addEventListener('click', async function () {
                door.classList.add('open');

                randNum = Math.floor(Math.random() * 6) + 1;
                randCat = document.querySelector(`#cat${randNum}`);

                catContainer.style.transform = 'scale(1)';
                catContainer.style.borderRadius = '0';

                await updateFact();

                animateCat(randCat);
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
    if (side !== 'top') {
        captions[side].addEventListener('click', function () {
            captions[side].classList.remove('heroCaption-visible');
            captions[side].classList.add('heroCaption-invisible');
            heroAnimation.play();
        });
    } else {
        const cancelBtn = document.querySelector('.cancel');
        const subscribeBtn = document.querySelector('.subscribe');

        cancelBtn.addEventListener('click', function () {

        });

        subscribeBtn.addEventListener('click', function (e) {
            alert("Seriously? \n\nOkay, well, I might implement that another time. Weirdo.")
            catContainer.style.transform = 'scale(0)';
            catContainer.style.borderRadius = '50%';
            door.classList.remove('open');

            allCats.forEach(cat => cat.style.transform = 'scale(0) rotate(-360deg)');

            enableScroll();
            heroAnimation.play();
        });
    }
})
