import '../styles/404.scss';
import '../scripts/burger-menu';
import { animate404, fourZeroFour, animateNum } from '../scripts/animations';

animate404();

fourZeroFour.forEach(num => {
    num.addEventListener('click', async () => {
        animateNum(num);
    })
})
