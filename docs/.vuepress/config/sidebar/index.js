const jcaiot = require('./jcaiot');

module.exports = {
  'sidebar': Object.assign({}, {
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
  })

}