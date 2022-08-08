const sidebar = require('../sidebar/');
module.exports = {
  type: 'blog',
  sidebar: sidebar.sidebar, //在所有页面中启用自动生成侧栏
  author: 'LiuYang',
  authorAvatar: '/assets/img/logo.png',
  search: false,
  lastUpdated: 'Last Updated',
  startYear: '2019',
  displayAllHeaders: true,
  vssueConfig: {
    platform: 'github',
    owner: 'liuyang19900520',
    repo: 'liuyang19900520.github.io',
    clientId: process.env.VSSUEID,
    clientSecret: process.env.VSSUESECRET,
  },
  nav: [{
      text: 'Blog',
      link: '/',
      icon: 'reco-home'
    },
    {
      text: 'Subject',
      icon: 'reco-document',
      items: [{
        text: 'NestJS+Vue+MongoDB小型展示系统',
        link: '/subject/jcaiot/'
      }, {
        text: '用于练手的一个Java项目',
        link: '/subject/layman/'
      }, {
        text: 'LeetCode(放弃之旅)',
        link: '/subject/leetcode/'
      }, ]
    }, {
      text: 'Github',
      link: 'https://github.com/liuyang19900520',
      target: '_blank'
    },
  ],
  // 博客配置
  blogConfig: {
    category: {
      location: 3, // 在导航栏菜单中所占的位置，默认2
      text: 'Category' // 默认文案 “分类”
    },
    tag: {
      location: 4, // 在导航栏菜单中所占的位置，默认3
      text: 'Tag' // 默认文案 “标签”
    }
  },
  editLinks: true,
  mode: 'light'
};
