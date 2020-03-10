const jcaiot = require('./jcaiot');
const mallBootJp = require('./mall-learning-boot-jp');
const blog = require('./blog');

module.exports = {
  'zh': {
    '/subject/mall-learning-boot/': [{
        title: '前言', // 必要的
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: [
          'introduction',
          'architecture'
        ]
      },
      {
        title: '搭建',
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: [
          'mysql'
        ]
      }
    ],
    '/subject/jcaiot/': jcaiot,
    '/blog/': blog
  },
  'jp': {
    '/jp/subject/mall-learning-boot/': mallBootJp
  }
}