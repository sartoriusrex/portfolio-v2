let moreAboutMeButton = document.getElementById('read-more-button');
let moreAboutMeDiv = document.getElementById('more-about-me');

moreAboutMeButton.addEventListener("click", function(){
	moreAboutMeDiv.style.left = "0";
});

moreAboutMeDiv.addEventListener("click", function(){
	moreAboutMeDiv.style.left = "-100%";
});

moreAboutMeDiv.addEventListener("focusout", function(){
	moreAboutMeDiv.style.left = "-100%";
});