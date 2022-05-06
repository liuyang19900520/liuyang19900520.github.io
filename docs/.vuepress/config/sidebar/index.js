const jcaiot = require('./jcaiot');
const layman= require('./layman');
const leetcode = require('./leetcode');

module.exports = {
  'sidebar': Object.assign({}, {
    '/subject/layman': layman,
    '/subject/jcaiot/': jcaiot,
    '/subject/leetcode/': leetcode,
  })

}