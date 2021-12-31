const weirdArrow = require('../images/weird-arrow');
const pdf = require('../images/icons/pdf');
const github = require('../images/icons/github');
const linkedin = require('../images/icons/linkedin');
const stackoverflow = require('../images/icons/stackoverflow');

module.exports = function (data) {
  return `
<footer id="the-footer">
      <div class="weird">
              <p>Proud Member of <a href="https://weirdwidewebring.net" target="_blank">The Weird Wide
                              Webring</a></p>

              <div class="weird-links">
                      <a class="arrow" href="https://weirdwidewebring.net/prev.html" target="_blank">
                              ${weirdArrow()}
                              Previous
                      </a>

                      <div>
                              <a href="https://weirdwidewebring.net/random.html" target="_blank">Random!</a>

                              <a href="https://weirdwidewebring.net/join.html" target="_blank">Join</a>
                      </div>

                      <a class="arrow" href="https://weirdwidewebring.net/next.html" target="_blank">
                              ${weirdArrow()}
                              Next
                      </a>
              </div>
      </div>
      <ul>
              <li><a href="imgs/cv-mai-small.pdf" target="_blank"
                              rel="noopener noreferrer">${pdf()}</a></li>
              <li><a href="https://www.github.com/sartoriusrex" target="_blank"
                              rel="noopener noreferrer">${github()}</a></li>
              <li><a href="https://www.linkedin.com/in/dennismai-dev" target="_blank"
                              rel="noopener noreferrer">${linkedin()}</a></li>
              <li><a href="https://stackoverflow.com/users/11639750/dmai-developer?tab=profile" target="_blank"
                              rel="noopener noreferrer">${stackoverflow()}</a>
              </li>
              <li><a href="/changelog.html">Change Log</a></li>
      </ul>
      <p class="cookies">* I don't use cookies and I don't track you.</p>
      <p>Copyright ${(new Date()).getFullYear()} Dennis Mai</p>
</footer>
<script src="./scripts/animations.js"></script>
</html>
`
}