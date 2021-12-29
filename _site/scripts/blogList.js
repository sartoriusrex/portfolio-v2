const fs = require('fs');

export const posts = fs.readdirSync('../views/', (err, files) => {
    if (err) return console.log(err);
    return files;
})

