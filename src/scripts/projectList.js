const projects = [
    {
        name: 'Polyglotist',
        description: 'An application for intermediate language learners to improve reading fluency and vocabulary. Users can read foreign language newspapers, as well as look up words and phrases  and save them. Looking up and saving can be done in a total of 3 clicks, a drastic speed from  leaving the app or window to look up and document a word. This helps learners improve fluency with increasing focus on the text at hand instead of abruptly switching contexts.',
        links: {
            Github: 'https://github.com/sartoriusrex/polyglotist',
            Live: 'https://www.dennismai.dev/404.html'
        },
        images: [
            'imgs/polyglotist-1.png',
            'imgs/polyglotist-2.png',
            'imgs/polyglotist-3.png',
        ],
        built: 'Node, Express, PostgresQl, React, Typescript, Docker, Webpack, SCSS, Puppeteer, Jest, React-Testing-Library, Google Cloud API, JWT'
    },
    {
        name: 'Jiu Jitsu Distilled',
        description: 'A web app for users to document and share Brazilian Jiu Jitsu techniques and flows. Users can make notes on techniques and add videos from external sources, link techniques in sequences, like them, and share them in-app with other users or by e-mail. There are hundreds of grappling techniques and variations. Understanding how they connect with one another is the essence of Jiu Jitsu. This application helps users drill techniques and how to flow from one to another given different scenarios.',
        links: {
            'Github Front-end': 'https://github.com/sartoriusrex/jjd-client',
            'Github Back-end': 'https://github.com/sartoriusrex/jjd-server-public',
            Live: 'https://jjd-client-v1.herokuapp.com/'
        },
        images: [
            'imgs/jjd-sm.png',
        ],
        built: 'Node, Express, Mongo, Mongoose, React, SCSS, Bootstrap, Jest, JWT, React-Form, Mailgun, Heroku, AdobeXD'
    },
    {
        name: 'US Department of Truth',
        description: "A simple server-side website satirizing the the US's current relationship with misinformation and disinformation. It was designed to both educate and poke fun at the news, media and US government. Read everything with 2 grains of salt, some lime, and a bit of tequila.",
        links: {
            Github: 'https://github.com/sartoriusrex/USDT',
            Live: 'https://usdt-satire.herokuapp.com/'
        },
        images: [
            'imgs/usdt-sm.png',
        ],
        built: 'Node, Express, ejs, Mongo, Mongoose, Passport.js, Nodemailer, SendGrid, SCSS, gulp, Heroku'
    },
    {
        name: 'This Portfolio!',
        description: "This very website! For more information, you can read the post provided in the link below.",
        links: {
            Github: 'https://github.com/sartoriusrex/portfolio-v2',
            'About This Blog': '/how-i-made-this-blog.html',
            Live: 'https://www.dennismai.dev/'
        },
        images: [
            'imgs/fam.png'
        ],
        built: 'ejs, SCSS, Vanilla JS, Webpack, gsap'
    }
]

module.exports = projects;