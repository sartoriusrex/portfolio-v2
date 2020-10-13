const emailLink = document.getElementById('email-link');
const submitBtn = document.getElementById('submit-answer');

submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
})