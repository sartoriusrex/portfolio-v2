import './styles/style.scss';
import bioImage from './images/bio.jpeg';
import bioImagePlaceholder from './images/placeholders/bio-ph.jpeg';
import jjdImageSm from './images/projects/jjd-sm.png';
import jjdImageSmPlaceholder from './images/placeholders/jjd-sm-ph.png';
import usdtImageSm from './images/projects/usdt-sm.png';
import usdtImageSmPlaceholder from './images/placeholders/usdt-sm-ph.png';
import ravenImageSm from './images/projects/raven-sm.png';
import ravenImageSmPlaceholder from './images/placeholders/raven-sm-ph.png';


let biopic = document.querySelector("#biopic");
let jjdpic = document.querySelector("#jjd");
let usdtpic = document.querySelector("#usdt");
let ravenpic = document.querySelector("#raven");

function mountImages() {
	biopic.src = bioImagePlaceholder;
	jjdpic.src = jjdImageSmPlaceholder;
	usdtpic.src = usdtImageSmPlaceholder;
	ravenpic.src = ravenImageSmPlaceholder;
}

mountImages();

const intersectionObserver = new IntersectionObserver( function( entries ) {
	if ( entries[0].intersectionRatio <= 0 ) {
		return;
	}


});

intersectionObserver.observe(document.querySelector("#portfolio"));