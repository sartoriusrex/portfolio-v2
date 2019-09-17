import bioImage from './images/bio.jpeg';
import bioImagePlaceholder from './images/placeholders/bio-ph.jpeg';

// jjd images
import jjdImageSm from './images/projects/jjd-sm.png';
import jjdImageMd from './images/projects/jjd-md.png';
import jjdImageLg from './images/projects/jjd-lg.png';
import jjdImageSmPlaceholder from './images/placeholders/jjd-sm-ph.png';
import jjdImageMdPlaceholder from './images/placeholders/jjd-md-ph.png';
import jjdImageLgPlaceholder from './images/placeholders/jjd-lg-ph.png';

// usdt images
import usdtImageSm from './images/projects/usdt-sm.png';
import usdtImageMd from './images/projects/usdt-md.png';
import usdtImageLg from './images/projects/usdt-lg.png';
import usdtImageSmPlaceholder from './images/placeholders/usdt-sm-ph.png';
import usdtImageMdPlaceholder from './images/placeholders/usdt-md-ph.png';
import usdtImageLgPlaceholder from './images/placeholders/usdt-lg-ph.png';

// raven images
import ravenImageSm from './images/projects/raven-sm.png';
import ravenImageMd from './images/projects/raven-md.png';
import ravenImageLg from './images/projects/raven-lg.png';
import ravenImageSmPlaceholder from './images/placeholders/raven-sm-ph.png';
import ravenImageMdPlaceholder from './images/placeholders/raven-md-ph.png';
import ravenImageLgPlaceholder from './images/placeholders/raven-lg-ph.png';


// Select images
let biopic = document.querySelector("#biopic");
let jjdpic = document.querySelector("#jjd");
let usdtpic = document.querySelector("#usdt");
let ravenpic = document.querySelector("#raven");

// mount placeholders
export function mountImages() {
	biopic.src = bioImagePlaceholder;

	let sizes = `
		(max-width: 400px) 300px,
		(max-width: 750px) 600px,
		900px,
	`

	jjdpic.sizes = sizes;
	usdtpic.sizes = sizes;
	ravenpic.sizes = sizes;

	jjdpic.srcset = `
		${jjdImageSmPlaceholder} 350w,
		${jjdImageMdPlaceholder} 550w,
		${jjdImageLgPlaceholder} 800w,
	`

	jjdpic.src = jjdImageSmPlaceholder;

	usdtpic.srcset = `
		${usdtImageSmPlaceholder} 350w,
		${usdtImageMdPlaceholder} 550w,
		${usdtImageLgPlaceholder} 800w,
	`

	usdtpic.src = usdtImageSmPlaceholder;

	ravenpic.srcset = `
		${ravenImageSmPlaceholder} 350w,
		${ravenImageMdPlaceholder} 550w,
		${ravenImageLgPlaceholder} 800w,
	`

	ravenpic.src = ravenImageSmPlaceholder;
}

// Intersection Observer to lazyload images
const intersectionObserver = new IntersectionObserver( function( entries ) {
	if ( entries[0].intersectionRatio <= 0 ) {
		return;
	}


});

intersectionObserver.observe(document.querySelector("#portfolio"));