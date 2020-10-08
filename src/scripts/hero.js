import { heroAnimation, starAnimation, animateCat } from './animations';
import { enableScroll, disableScroll } from './enableDisableScrolling';

const sides = ['front', 'back', 'left', 'right', 'bottom', 'top']
const cube = {}
const captions = {}
const door = document.querySelector('.door');
const catContainer = document.querySelector('.container--interactive-cat');
const allCats = document.querySelectorAll('.cat');
const factContainer = document.querySelector('#cat-fact');
let currentCats;

const getFact = async function () {
    return fetch('https://catfact.ninja/fact?max_length=140').then(response => {
        return response.json();
    }).then(data => data.fact)
}

const updateFact = async function () {
    const fact = await getFact();

    factContainer.innerText = fact;
}

const clearCatStyle = async function () {
    currentCats = Array.from(allCats).filter(cat => cat.style.length > 0);
    await Promise.all(currentCats.map(cat => cat.style = ""));
}

const closeCatBox = async function () {
    catContainer.style.transform = 'scale(0)';
    catContainer.style.borderRadius = '50%';
    door.classList.remove('open');

    await clearCatStyle();

    enableScroll();
    heroAnimation.play();
}

const animateRandomCat = async function () {
    await clearCatStyle();
    let randNum = Math.floor(Math.random() * 6) + 1;
    let randCat = document.querySelector(`#cat${randNum}`);

    animateCat(randCat);
}

// When the door opens, the random cat container scales up and the cat spins out, revealing the text
door.addEventListener('click', async function (e) {
    e.stopPropagation();
    door.classList.add('open');

    catContainer.style.transform = 'scale(1)';
    catContainer.style.borderRadius = '0';

    await updateFact();

    animateRandomCat();
    starAnimation.play();

    disableScroll();
});

// Add click events on all sides and their captions
sides.forEach(side => {
    cube[side] = document.querySelector(`.side.${side}`);
    if (side !== 'top') captions[side] = document.querySelector(`#${side}`);

    //When the side of the cube is clicked, we make the caption visible by removing class invisible and adding class visible
    // Then we  pause the animation
    cube[side].addEventListener('click', function (e) {
        let paused = heroAnimation.paused();

        if (side !== 'top') {
            captions[side].classList.remove('heroCaption-invisible');
            captions[side].classList.add('heroCaption-visible');
        }

        if (paused) {
            heroAnimation.play();
        } else {
            heroAnimation.pause();
        }
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
        const catMessage = document.querySelector('#cat-message');
        const cancelBtn = document.querySelector('.cancel');
        const subscribeBtn = document.querySelector('.subscribe');
        let cancelCount = 0;

        cancelBtn.addEventListener('click', async function (e) {
            e.stopPropagation();

            switch (cancelCount) {
                case 0:
                    catMessage.innerText = "Are you crazy?! Here, have another Cat Fact! to change your mind."

                    await updateFact();
                    animateRandomCat();
                    cancelCount++;
                    break;
                case 1:
                    catMessage.innerText = "I think you clicked the wrong button. Here's another fact for free."

                    await updateFact();
                    animateRandomCat();
                    cancelCount++;
                    break;
                case 2:
                    catMessage.innerHTML = "You clicked 'No?' again? Ugh. In case you're out of the loop, check <a href='https://www.reddit.com/r/funny/comments/owx3v/so_my_little_cousin_posted_on_fb_that_he_was/' target='_blank' rel='noopener noreferrer'>this page</a> out.";

                    await updateFact();
                    animateRandomCat();
                    cancelCount++;
                    break;
                default:
                    cancelCount = 0;
                    closeCatBox();
                    catMessage.innerText = 'Thank you for subscribing to Cat Facts!';
            }
        });

        subscribeBtn.addEventListener('click', function () {
            alert("Seriously? \n\nOkay, well, I might implement that another time. Weirdo.");

            closeCatBox();
        });
    }
})
