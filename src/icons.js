import pdf from './images/icons/pdf.svg';
import linkedin from './images/icons/linkedin.svg';
import github from './images/icons/github.svg';
import stackoverflow from './images/icons/stackoverflow.svg';
import skype from './images/icons/skype.svg';

// Mount Icons
let pdfIcon = document.querySelector("#pdf-icon");
let linkedinIcon = document.querySelector("#linkedin-icon");
let githubIcon = document.querySelector("#github-icon");
let stackoverflowIcon = document.querySelector("#stackoverflow-icon");
let skypeIcon = document.querySelector("#skype-icon");

export default function mountIcons(){
	pdfIcon.src = pdf;
	linkedinIcon.src = linkedin;
	githubIcon.src = github;
	stackoverflowIcon.src = stackoverflow;
	skypeIcon.src = skype;
}