// const sass = require('node-sass');
import './style.scss';

function component() {
	const element = document.createElement('div');

	element.innerHTML = "This is an element";
	element.classList.add('element');

	alert("element created");

	return element;
}

document.body.appendChild(component());