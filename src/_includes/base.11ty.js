const head = require('./components/head');
const header = require('./components/header');
const footer = require('./components/footer');

module.exports = function (data) {
  return `
  ${head(data.title)}
  ${header()}
  ${data.content}
  ${footer()}
  `
}
