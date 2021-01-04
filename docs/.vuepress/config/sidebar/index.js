const jcaiot = require('./jcaiot');
const laymanStarter = require('./layman-starter');
const leetcode = require('./leetcode');
const springSource = require('./spring-source');

module.exports = {
  'sidebar': Object.assign({}, {
    '/subject/layman-starter/': laymanStarter,
    '/subject/jcaiot/': jcaiot,
    '/subject/leetcode/': leetcode,
    '/subject/spring-source/': springSource,
  })

}