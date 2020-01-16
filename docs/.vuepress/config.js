const themeConfig = require('./config/theme/')

module.exports = {
  themeConfig,
  locales: {
    '/': {
      lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
      title: "LiuYang's Blog",
      description: '我常常想，想进步总不是坏事',
    },
    '/en/': {
      lang: 'en-US',
      title: "LiuYang's Blog",
      description: 'The true test of a man’s character is what he does when no one is watching'
    },
    '/jp/': {
      lang: 'ja',
      title: "LiuYang's Blog",
      description: '一万年来誰か歴史記すのか、三千里外にて諸侯に封ぜられるのを欲そう'
    }
  },
  markdown: {
    lineNumbers: true,
    externalLinks: {
      target: '_blank',
      rel: ['https://github.com/macrozheng/mall', 'https://blog.csdn.net/u012453843/category_6970308.html']
    }
  },
}