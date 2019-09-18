const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRID);

const form = document.querySelector(".contact-form");
form.onsubmit = submit;

const email = document.querySelector("input[name='email']");
const subject = document.querySelector("input[name='subject']");
const message = document.querySelector("textarea[name='message']");

const filter = "friends don't lie";

function verifySubject( subject ){
	return subject.indexOf(filter) !== -1;
}

export default async function submit( e ) {
	const verified = await verifySubject( subject.value );

	if ( verified ){
		try {
			const msg = {
				to: "dmai.developer@gmail.com",
				from: email.value,
				subject: subject.value,
				text: message.value,
				html:`<p> ${message.value} </p>`
			}
		
			sendgrid.send(msg);
			form.reset();
			e.preventDefault();

		} catch( error ){
			console.log( error.message );
		}
	} else {
		alert("If you're not a bot, please read the form instructions again. You may have missed something.");

		form.reset();
		e.preventDefault();
	}
}