import './styles/style.scss';
import Biopic from './images/bio.jpeg';

function component() {
	const pic = document.querySelector("#biopic");

	pic.src = Biopic;
}

component();

const intersectionObserver = new IntersectionObserver( function( entries ) {
	if ( entries[0].intersectionRatio <= 0 ) {
		return;
	}

	
});

intersectionObserver.observe(document.querySelector("#portfolio"));