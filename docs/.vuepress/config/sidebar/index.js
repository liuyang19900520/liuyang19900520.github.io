const jcaiot = require('./jcaiot');

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
    '/blog/': [{
        title: 'java', // 必要的

        sidebarDepth: 1, // 可选的, 默认值是 1
        children: [{
          title: 'java 1-1', // 必要的

          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 1, // 可选的, 默认值是 1
        }, {
          title: 'java 1-2', // 必要的

          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 1, // 可选的, 默认值是 1
        }]
      },
      {
        title: 'python',
      }
    ]

  }
}