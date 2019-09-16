import './styles/style.scss';
import bioImage from './images/bio.jpeg';
import bioImagePlaceholder from './images/placeholders/bio-ph.jpeg';
import jjdImageSm from './images/projects/jjd-sm.png';
import jjdImageSmPlaceholder from './images/placeholders/jjd-sm-ph.png';
import usdtImageSm from './images/projects/usdt-sm.png';
import usdtImageSmPlaceholder from './images/placeholders/usdt-sm-ph.png';
import ravenImageSm from './images/projects/raven-sm.png';
import ravenImageSmPlaceholder from './images/placeholders/raven-sm-ph.png';
import pdf from './images/icons/pdf.svg';
import linkedin from './images/icons/linkedin.svg';
import github from './images/icons/github.svg';
import stackoverflow from './images/icons/stackoverflow.svg';
import skype from './images/icons/skype.svg';
import resume from './images/mai_resume.pdf';


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


// Mount Links
let resumeLink = document.querySelector("#resume");
let resumeLinkTwo = document.querySelector("#resume-link");

function mountLinks() {
	resumeLink.href = resume;
	resumeLinkTwo.href = resume;
}

mountLinks();


// Mount Icons
let pdfIcon = document.querySelector("#pdf-icon");
let linkedinIcon = document.querySelector("#linkedin-icon");
let githubIcon = document.querySelector("#github-icon");
let stackoverflowIcon = document.querySelector("#stackoverflow-icon");
let skypeIcon = document.querySelector("#skype-icon");

function mountIcons(){
	pdfIcon.src = pdf;
	linkedinIcon.src = linkedin;
	githubIcon.src = github;
	stackoverflowIcon.src = stackoverflow;
	skypeIcon.src = skype;
}

mountIcons();

// Intersection Observer to lazyload images
const intersectionObserver = new IntersectionObserver( function( entries ) {
	if ( entries[0].intersectionRatio <= 0 ) {
		return;
	}


});

intersectionObserver.observe(document.querySelector("#portfolio"));