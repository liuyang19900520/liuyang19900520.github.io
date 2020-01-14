module.exports = {
  'zh': {
    '/subject/mall-study/': [{
        title: 'Group 1', // 必要的
        path: '/subject/mall-study/', // 可选的, 应该是一个绝对路径
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: [{
          title: 'Group 1-1', // 必要的
          path: '/subject/mall-study/1-1', // 可选的, 应该是一个绝对路径
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 1, // 可选的, 默认值是 1
        }, {
          title: 'Group 1-2', // 必要的
          path: '/subject/mall-study/1-2', // 可选的, 应该是一个绝对路径
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 1, // 可选的, 默认值是 1
        }]
      },
      {
        title: 'Group 2',
        path: '/subject/mall-study/'
      }
    ],
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