const form = document.querySelector(".contact-form");
const email = document.querySelector("input[name='email']");
const subject = document.querySelector("input[name='subject']");
const message = document.querySelector("textarea[name='message']");

form.onsubmit = submit;

export default function submit( e ) {
	
	form.reset();
	e.preventDefault();
}