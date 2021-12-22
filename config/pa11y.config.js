const fs = require('fs');
// const path = require('path')

const dist = fs.readdirSync('dist', (err, files) => {
    if (err) throw err;

    return files
})
    .filter( file => file.split('.')[1] === 'html')
    .map( file => `file://${process.cwd()}/dist/${file}`)


const config = {
    "defaults": {
        "timeout": 1000,
        "viewport": {
            "width": 320,
            "height": 480
        }
    },
    "urls": dist
}

module.exports = config;