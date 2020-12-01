const projects = [
    {
        name: 'Polyglotist',
        description: 'An application for intermediate language learners to improve reading fluency and vocabulary. Users can read foreign language newspapers, as well as look up words and phrases  and save them. Looking up and saving can be done in a total of 3 clicks, a drastic speed from  leaving the app or window to look up and document a word. This helps learners improve fluency with increasing focus on the text at hand instead of abruptly switching contexts.',
        links: {
            Github: 'https://github.com/sartoriusrex/polyglotist',
            Live: ''
        },
        images: [
            'imgs/polyglotist-1.png',
            'imgs/polyglotist-2.png',
            'imgs/polyglotist-3.png',
        ],
        built: 'Node, Express, PostgresQl, React, Typescript, Docker, Webpack, SCSS, Puppeteer, Jest, React- Testing - Library,Google Cloud API, JWT'
    },
    {
        name: 'Jiu Jitsu Distilled',
        description: 'A web application for users to document and share Brazilian Jiu Jitsu techniques.Users can make noteson techniques and link to videos, connect techniques insequences, like them, and share them in -app with other usersor by e - mail.There are hundreds of grappling techniques and manyvariations between them.Flowing from one toanother is the essence of Jiu Jitsu, but understanding howand when they can move from one to another is a largeundertaking.This application helps document the relationshipsthey have with each other.',
        links: {
            'Github Front-end': 'https://github.com/sartoriusrex/jjd-client',
            'Github Back-end': 'https://github.com/sartoriusrex/jjd-server-public',
            Live: 'https://jjd-client-v1.herokuapp.com/'
        },
        images: [
            'imgs/jjd-sm.png',
        ],
        built: 'Node, Express, Mongo, Mongoose, React, SCSS, Bootstrap, Jest, JWT, React - Form, Mailgun, Heroku, AdobeXD'
    },
    {
        name: 'US Department of Truth',
        description: "A simple server-side site satirizing the the US's current relationship with misinformation and disinformation.It was designed to both educate andpoke fun at the news /media and the government.Read everythingwith 2 grains of salt, some lime, and a bit of tequila.",
        links: {
            Github: 'https://github.com/sartoriusrex/USDT',
            Live: 'https://usdt-satire.herokuapp.com/'
        },
        images: [
            'imgs/usdt-sm.png',
        ],
        built: 'Node, Express, ejs, Mongo, Mongoose, Passport.js, Nodemailer, SendGrid, scss, gulp, Heroku'
    },
    {
        name: 'This Portfolio!',
        description: "This is my website that you're looking at now! For more information, you can read the post provided in he link below.",
        links: {
            Github: 'https://github.com/sartoriusrex/portfolio-v2',
            'about this blog': '/how-i-made-this-blog.html',
            Live: 'https://www.dennismai.dev/'
        },
        images: [
            'imgs/fam.png'
        ],
        built: 'ejs, SASS, Vanilla JS, Webpack, gsap'
    }
]

module.exports = projects;