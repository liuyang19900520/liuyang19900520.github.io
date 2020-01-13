  module.exports = {
    title: "LiuYang's Blog",
    description: 'Just playing around',
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