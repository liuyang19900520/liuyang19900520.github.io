const themeConfig = require('./config/theme/')

module.exports = {
  themeConfig,
  locales: {
    '/': {
      logo: '/assets/img/logo.png',
      lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
      title: "LiuYang's Blog",
      description: '我常常想，想进步总不是坏事',
    },
    '/en/': {
      logo: '/assets/img/logo.png',
      lang: 'en-US',
      title: "LiuYang's Blog",
      description: 'The true test of a man’s character is what he does when no one is watching'
    },
    '/jp/': {
      logo: '/assets/img/logo.png',
      lang: 'ja',
      title: "LiuYang's Blog",
      description: '一生懸命'
    }
  },
  markdown: {
    lineNumbers: true
  },
}