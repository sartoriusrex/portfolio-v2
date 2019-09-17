import resume from './images/mai_resume.pdf';

// Mount Links
let resumeLink = document.querySelector("#resume");
let resumeLinkTwo = document.querySelector("#resume-link");

export default function mountLinks() {
	resumeLink.href = resume;
	resumeLinkTwo.href = resume;
}