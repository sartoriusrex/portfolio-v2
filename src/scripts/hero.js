import { heroAnimation, starAnimation, animateCat } from './animations';
import { enableScroll, disableScroll } from './enableDisableScrolling';

starAnimation.pause();

const sides = ['front', 'back', 'left', 'right', 'bottom', 'top']
const cube = {}
const captions = {}
const door = document.querySelector('.door');
const catContainer = document.querySelector('.container--interactive-cat');
const allCats = document.querySelectorAll('.cat');
const factContainer = document.querySelector('#cat-fact');
const heroContainer = document.querySelector('.container--hero');
let currentCats;

const catFacts = {
    0: "A house cat’s genome is 95.6 percent tiger, and they share many behaviors with their jungle ancestors.",
    1: "Cats are believed to be the only mammals who don’t taste sweetness.",
    2: "Cats are nearsighted, but their peripheral vision and night vision are much better than that of humans.",
    3: "Cats are supposed to have 18 toes (five toes on each front paw; four toes on each back paw).",
    4: "Cats can jump up to six times their length.",
    5: "Cats’ claws all curve downward, which means that they can’t climb down trees head-first. Instead, they have to back down the trunk.",
    6: "Cats’ collarbones don’t connect to their other bones, as these bones are buried in their shoulder muscles.",
    7: "Cats have 230 bones, while humans only have 206.",
    8: "Cats have an extra organ that allows them to taste scents on the air, which is why your cat stares at you with her mouth open from time to time.",
    9: "Cats have whiskers on the backs of their front legs, as well.",
    10: "Cats have nearly twice the amount of neurons in their cerebral cortex as dogs.",
    11: "Cats have the largest eyes relative to their head size of any mammal.",
    12: "Cats make very little noise when they walk around. The thick, soft pads on their paws allow them to sneak up on their prey — or you!",
    13: "Cats’ rough tongues can lick a bone clean of any shred of meat.",
    14: "Cats use their long tails to balance themselves when they’re jumping or walking along narrow ledges.",
    15: "A cat’s whiskers are generally about the same width as its body.",
    16: "Cats walk like camels and giraffes: They move both of their right feet first, then move both of their left feet. No other animals walk this way.",
    17: "Male cats are more likely to be left-pawed, while female cats are more likely to be right-pawed.",
    18: "Though cats can notice the fast movements of their prey, it often seems to them that slow-moving objects are actually stagnant.",
    19: "Some cats are ambidextrous, but 40 percent are either left- or right-pawed.",
    20: "Some cats can swim.",
    21: "There are cats who have more than 18 toes. These extra-digit felines are referred to as being “polydactyl.”",
    22: "A cat’s average lifespan increased by a year over the span of time between 2002 and 2012, according to a study by Banfield Pet Hospital.",
    23: "According to The Huffington Post, cats typically sleep for 12 to 16 hours a day.",
    24: "Cats are crepuscular, which means that they’re most active at dawn and dusk.",
    25: "Cats are fastidious creatures about their “bathroom.” If you have more than one cat, you should have one litter box for each.",
    26: "Cats can spend up to a third of their waking hours grooming.",
    27: "Cats live longer when they stay indoors.",
    28: "Cats’ purring may be a self-soothing behavior, since they make this noise when they’re ill or distressed, as well as when they’re happy.",
    29: "Cats will refuse an unpalatable food to the point of starvation.",
    30: "Despite popular belief, many cats are actually lactose intolerant.",
    31: "Female cats have the ability to get pregnant when they are only 4 months old!",
    32: "Grapes, raisins, onions, garlic, and chives, are all extremely harmful foods for cats.",
    33: "If you keep your cat active during the day, he will sleep better at night.",
    34: "It’s believed that catnip produces an effect similar to LSD or marijuana in cats.",
    35: "Kittens can be spayed or neutered when they are only eight weeks old. If possible, these procedures should be performed in the first 5 months of your cat’s life.",
    36: "Male cats who have been fixed need fewer calories to maintain their weight.",
    37: "Spaying and neutering can extend male cat lives an average of 62 percent and females lives an average of 39 percent longer.",
    38: "Your cat’s grooming process stimulates blood flow to his skin, regulates his body temperature and helps him relax.",
    39: "A cat with a question-mark-shaped tail is asking, “Want to play?”",
    40: "According to Wilde, a slow blink is a “kitty kiss.” This movement shows contentment and trust.",
    41: "Cats have a unique “vocabulary” with their owner — each cat has a different set of vocalizations, purrs and behaviors.",
    42: "Cats have up to 100 different vocalizations — dogs only have 10.",
    43: "Cats find it threatening when you make direct eye contact with them.",
    44: "Cats mark you as their territory when they rub their faces and bodies against you, as they have scent glands in those areas.",
    45: "Cats may yawn as a way to end a confrontation with another animal. Think of it as their “talk to the hand” gesture.",
    46: "Hissing is defensive, not aggressive, expressing fear, stress or discomfort.",
    47: "If cats are fighting, the cat that’s hissing is the more vulnerable one, says Wilde.",
    48: "If your cat approaches you with a straight, almost vibrating tail, this means that she is extremely happy to see you.",
    49: "Kneading — which some people refer to as “making biscuits” — is a sign of contentment and happiness.",
    50: "Meowing is a behavior that cats developed exclusively to communicate with people.",
    51: "A cat flops over and exposes his belly when he’s relaxed and showing trust.",
    52: "When cats hit you with retracted claws, they’re playing, not attacking.",
    53: "When your cat wags her tail, it’s her way of warning you that you are getting on her last nerve.",
    54: "When your cat sticks his butt in your face, he is doing so as a gesture of friendship.",
    55: "Whiskers are also good indicators of a cat’s mood. When a cat is scared, he put his whiskers back. But when a cat is in hunting mode, he puts his whiskers forward.",
    56: "Your cat drapes its tail over another cat, your dog, or you as a symbol of friendship.",
    57: "Cats are very fussy about their water bowls; some prefer to ignore their bowls entirely in favor of drinking from the sink faucet.",
    58: "Cats groom other cats — and sometimes people — in a ritual called allogrooming.",
    59: "Cats like to sleep on things that smell like their owners, such as their pillows and dirty laundry (ick!).",
    60: "Cats love to sleep in laundry baskets, too, because they’re basically hiding places with peep holes.",
    61: "Cats often attack your ankles when they’re bored.",
    62: "Certain cats go crazy for foods you wouldn’t expect, like olives, potato chips, and the hops in beer.",
    63: "For some reason, cats really dislike citrus scents.",
    64: "If you can’t find your cat, you should look in a box or a bag, as these are some of their favorite hiding spots!",
    65: "Male cats who try to get to a female in heat can show very bizarre behavior — for example, some have been known to slide down chimneys!",
    66: "Many cats like to lick their owner’s freshly washed hair.",
    67: "Some cats love the smell of chlorine.",
    68: "Cats will often steal objects like stuffed animals, feather dusters, and other things that remind them of prey.",
    69: "A green cat was born in Denmark in 1995, possibly from high levels of copper in the water pipes nearby.",
    70: "It turns out that Abraham Lincoln was a crazy cat president! He had four cats that lived in the White House with him.",
    71: "Maria Assunta left her cat, Tomasso, her entire $13 million fortune when she died in 2011.",
    72: "President Bill Clinton’s cat, Socks, was said to receive more letters than the President himself.",
    73: "Stubbs, a 17-year-old orange tabby, is mayor of the historic district of Talkeetna, Alaska.",
    74: "A cat’s learning style is about the same as a 2- to 3-year-old child.",
    75: "A cat’s purr vibrates at a frequency of 25 to 150 hertz, which is the same frequency at which muscles and bones repair themselves.",
    76: "A group of kittens is called a “kindle.”",
    77: "A house cat could beat superstar runner Usain Bolt in the 200 meter dash.",
    78: "About half of the cats in the world respond to the scent of catnip.",
    79: "Cat breeders are called “catteries.”",
    80: "Cats can be toilet-trained.",
    81: "Cats can drink sea water in order to survive. (In case you’re wondering, we can’t.)",
    82: "Cats don’t have an incest taboo, so they may choose to mate with their brothers and sisters.",
    83: "Cats dream, just like people do.",
    84: "Cats have contributed to the extinction of 33 different species.",
    85: "Cats perceive people as big, hairless cats, says Wilde.",
    86: "Cats were first brought to the Americas in colonial times to get rid of rodents.",
    87: "Collective nouns for adult cats include “clowder,” “clutter,” “glaring,” and “pounce.”",
    88: "Each cat’s nose print is unique, much like human fingerprints.",
    89: "Every Scottish Fold cat in the world can trace its heritage back to the first one.",
    90: "It’s not uncommon to see cats in food stores in big cities as a form of free — and adorable — pest control.",
    91: "Kittens in the same litter can have more than one father, because the female cat releases multiple eggs when she is in heat.",
    92: "Male cats are the most sensitive to catnip, while kittens under 3 months old have no response at all.",
    93: "Most world languages have a similar word to describe the “meow” sound.",
    94: "99% of cats from shelters are not purebreeds, despite what many may think.",
    95: "Some 700 million feral cats live in the United States.",
    96: "Studies suggest that domesticated cats first appeared around 3600 B.C.",
    97: "The first known cat video was recorded in 1894.",
    98: "There are about 88 million pet cats in the United States, which makes them the most popular pet in the country!",
    99: "Two hundred feral cats prowl the park at Disneyland.",
    100: "White cats with blue eyes are prone to deafness.",
}

const getFact = function () {
    const randNum = Math.floor(Math.random() * (Object.keys(catFacts).length - 1) + 1);
    return catFacts[randNum];
}

const updateFact = function () {
    try {
        const fact = getFact();

        factContainer.innerText = fact;
    } catch (err) {
        console.log(err);
        factContainer.innerText = "Ah! We ran out of cat facts!"
    }
}

// Remove styling from all the .cat s
const clearCatStyle = async function () {
    currentCats = Array.from(allCats).filter(cat => cat.style.length > 0);
    await Promise.all(currentCats.map(cat => cat.style = ""));
}

// First return the styling to what it was before, then remove its class open and clear all cat styles, re-enable scroll and play the animation again!
const closeCatBox = async function () {
    catContainer.style.transform = 'scale(0)';
    catContainer.style.borderRadius = '50%';
    door.classList.remove('open');

    await clearCatStyle();

    enableScroll();
    heroAnimation.play();
}

// If we haven't already, clear all the styles from cats
// Get a random number from 1 to 6 and grab a random cat using that number
// ANIMATE THAT RANDOM CAT!
const animateRandomCat = async function () {
    await clearCatStyle();
    let randNum = Math.floor(Math.random() * 6) + 1;
    let randCat = document.querySelector(`#cat${randNum}`);

    animateCat(randCat);
}

// Prevent any clicks when user clicks on the star or background. This could accidentally trigger cat animations.
catContainer.addEventListener('click', function (e) { e.stopPropagation() });


let activeSide = null;

// Add click events on all sides and their captions
sides.forEach(side => {
    cube[side] = document.querySelector(`.side.${side}`);

    // Top side doesn't have a caption. It's the cat door
    if (side !== 'top') captions[side] = document.querySelector(`.${side} figcaption`);

    //When the side of the cube is clicked, we make the caption visible by toggling the class visible
    // Then we  pause the animation
    // For the top side, we check if the animation is paused and toggle it each time.
    // We also scroll the user to the very top for the best UX
    cube[side].addEventListener('click', function (e) {
        e.stopPropagation();

        // Do nothing is the active side isn't the one already clicked
        if (activeSide !== side && activeSide !== null) return;

        // If the side has been activated, toggle it back to null, otherwise set it
        activeSide = activeSide === side ? null : side;

        let paused = heroAnimation.paused();

        if (side !== 'top') {
            captions[side].classList.toggle('visible')
        }

        if (paused) {
            heroAnimation.play();
        } else {
            heroAnimation.pause();
        }

        // scroll to top of hero container
        window.scrollTo(0, heroContainer.getBoundingClientRect.y);
    });

    if (side === 'top') {
        // If it's the top side, we do some magic

        // get the stuff and init counter
        const catMessage = document.querySelector('#cat-message');
        const cancelBtn = document.querySelector('.cancel');
        const subscribeBtn = document.querySelector('.subscribe');
        let cancelCount = 0;

        // We set control flow for the user to either 'subscribe' or 'cancel' cat facts, but invert the actions.
        // Continuosly clicking no adds a new cat fact just to annoy the user (but only 3 times to click no before letting the user go)
        // Clicking subscribe just sends an alert.
        cancelBtn.addEventListener('click', async function (e) {
            e.stopPropagation();

            switch (cancelCount) {
                case 0:
                    catMessage.innerText = "Are you crazy?! Here, have another Cat Fact! to change your mind."
                    cancelBtn.innerText = "No!"
                    subscribeBtn.innerText = "Shyeah!";

                    await updateFact();
                    animateRandomCat();
                    cancelCount++;
                    break;
                case 1:
                    catMessage.innerHTML = "You clicked 'No?' again? Ugh. In case you're out of the loop, check <a href='https://www.reddit.com/r/funny/comments/owx3v/so_my_little_cousin_posted_on_fb_that_he_was/' target='_blank' rel='noopener noreferrer'>this page</a> out.";
                    cancelBtn.innerText = "..please..no..";
                    subscribeBtn.innerText = "okay";

                    await updateFact();
                    animateRandomCat();
                    cancelCount++;
                    break;
                default:
                    cancelCount = 0;
                    closeCatBox();
                    catMessage.innerText = 'Thank you for subscribing to Cat Facts!';
                    cancelBtn.innerText = "No?";
                    subscribeBtn.innerText = "Absolutely!";
            }
        });

        subscribeBtn.addEventListener('click', function () {
            alert("Seriously? \n\nOkay, well, I might implement that another time.\n\nWeirdo.");

            closeCatBox();
        });
    }
});

// When the door opens, the random cat container scales up and the cat spins out, revealing the text
door.addEventListener('click', function (e) {
    // first, make sure all the other sides' captions are off and inactive
    captions[activeSide].classList.toggle('visible');
    activeSide = null;

    e.stopPropagation();
    heroAnimation.pause();
    door.classList.add('open');

    catContainer.style.transform = 'scale(1)';
    catContainer.style.borderRadius = '0';

    updateFact();

    animateRandomCat();
    starAnimation.play();

    disableScroll();
});
