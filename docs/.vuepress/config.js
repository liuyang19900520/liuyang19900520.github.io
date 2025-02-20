const themeConfig = require("./config/theme");
const myPlugin = require("./vuepress-plugin-list-blogs");

module.exports = {
  title: "LiuYang's Blog",
  description: "我常常想，想进步总不是坏事",
  theme: "reco",
  head: [
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
      {
        text: "Tags",
        link: "/tags/",
        icon: "reco-tag",
      },
    ],
  ],
  locales: {
    "/": {
      lang: "zh-CN",
    },
    "/en/": {
      lang: "en-US",
    },
    "/jp/": {
      lang: "ja-JP",
    },
  },
  themeConfig,
  plugins: [myPlugin()],
  markdown: {
    lineNumbers: true,
    extendMarkdown: (md) => {
      // 使用更多的 markdown-it 插件!
    },
  },
};
