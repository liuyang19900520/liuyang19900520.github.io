const jcaiot = require('./jcaiot');
const laymanStarter = require('./layman-starter');

module.exports = {
  'sidebar': Object.assign({}, {
    '/subject/layman-starter/': laymanStarter,
    '/subject/jcaiot/': jcaiot,
  })

}