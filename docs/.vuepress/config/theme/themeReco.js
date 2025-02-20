const sidebar = require("../sidebar/");
module.exports = {
  type: "blog",
  author: "LiuYang",
  authorAvatar: "/assets/img/logo.png",
  search: false,
  lastUpdated: "Last Updated",
  startYear: "2019",
  displayAllHeaders: true,
  vssueConfig: {
    platform: "github",
    owner: "liuyang19900520",
    repo: "liuyang19900520.github.io",
    clientId: process.env.VSSUEID,
    clientSecret: process.env.VSSUESECRET,
  },
  locales: {
    "/": {
      lang: "zh-CN",
      nav: [
        {
          text: "博客",
          link: "/",
          icon: "reco-home",
        },
        {
          text: "合集",
          icon: "reco-document",
          items: [
            {
              text: "NestJS+Vue+MongoDB小型展示系统",
              link: "/subject/jcaiot/",
            },
            {
              text: "用于练手的一个Java项目",
              link: "/subject/layman/",
            },
            {
              text: "LeetCode(放弃之旅)",
              link: "/subject/leetcode/",
            },
          ],
        },
        {
          text: "Github",
          link: "https://github.com/liuyang19900520",
          target: "_blank",
        },
      ],
    },
    "/en/": {
      lang: "en-US",
      nav: [
        {
          text: "Blog",
          link: "/en/",
          icon: "reco-home",
        },
        {
          text: "Github",
          link: "https://github.com/liuyang19900520",
          target: "_blank",
        },
      ],
    },
    "/jp/": {
      lang: "ja-JP",
      nav: [
        {
          text: "ブログ",
          link: "/jp/",
          icon: "reco-home",
        },
        {
          text: "Github",
          link: "https://github.com/liuyang19900520",
          target: "_blank",
        },
      ],
    },
  },

  editLinks: true,
  mode: "light",
};
