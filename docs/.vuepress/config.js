  module.exports = {
    title: "LiuYang's Blog",
    description: '我常常想，想进步总不是坏事',
    base: "/docs/",
    themeConfig: {
      logo: '/assets/img/logo.png',
      search: false,
      nav: [{
          text: 'Blog',
          link: '/language/chinese/'
        },
        {
          text: 'Languages',
          ariaLabel: 'Language Menu',
          items: [{
              text: 'Chinese',
              link: '/language/chinese/'
            },
            {
              text: 'Japanese',
              link: '/language/japanese/'
            }
          ]
        }, {
          text: 'Github',
          link: 'https://github.com/liuyang19900520',
          target: '_blank'
        }
      ]
    }
  }