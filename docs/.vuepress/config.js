const themeConfig = require('./config/theme/');
module.exports = {
  title: "LiuYang's Blog",
  description: '我常常想，想进步总不是坏事',
  theme: 'reco',
  head: [
    ['meta', {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1,user-scalable=no'
    }, {
      text: 'Tags',
      link: '/tags/',
      icon: 'reco-tag'
    }]
  ],
  themeConfig,
  markdown: {
    lineNumbers: true
  }
};