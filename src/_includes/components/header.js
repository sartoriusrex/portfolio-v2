const logo = require('./logo');
const menu = require('./menu');
const codeMonkey = require('../images/codemonkey');
const legos = require('../images/legos');
const writing = require('../images/writing');
const sob = require('../images/sob');

module.exports = function () {
  return `
<body>
    <header>
        <nav aria-labelledby="burger-button">
            <a href="/" class='link--logo'>
                ${logo()}
            </a>
            <button id="burger-button" class="button--burger-menu" data-burger="closed" aria-expanded="false"
                aria-label="Open Menu">
                ${menu()}
            </button>
            <ul class="ul--burger-menu" data-burger="closed" role="menubar" aria-haspopup="true">
                <li class="button--close-burger-menu">
                    <button aria-label="Close Menu">Close The Menu</button>
                </li>
                <li>
                    <a href="/about">
                        ${codeMonkey()}
                        Myself
                    </a>
                </li>
                <li>
                    <a href="/projects">
                        ${legos()}
                        Projects
                    </a>
                </li>
                <li>
                    <a href="/writing">
                        ${writing()}
                        Writing
                    </a>
                </li>
                <li>
                    <a href="/contact">
                        ${sob()}
                        Connect!
                    </a>
                </li>
            </ul>
        </nav>
    </header>  
  `
}
