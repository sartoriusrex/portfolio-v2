import '../styles/404.scss';
import '../scripts/burger-menu';
import { animate404, fourZeroFour, playNum } from '../scripts/animations';

animate404();

fourZeroFour.forEach((num, i) => {
    num.addEventListener('click', async () => {
        playNum(i)
    })
})
