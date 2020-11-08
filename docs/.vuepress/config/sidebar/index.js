const jcaiot = require('./jcaiot');
const laymanStarter = require('./layman-starter');
const leetcode = require('./leetcode');

module.exports = {
  'sidebar': Object.assign({}, {
    '/subject/layman-starter/': laymanStarter,
    '/subject/jcaiot/': jcaiot,
    '/subject/leetcode/': leetcode,
  })

}