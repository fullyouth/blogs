module.exports = {
  base: '/blogs/',
  title: 'fullyouth',
  description: '前端,个人博客,javascript',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  plugins: ['image', '@vuepress/back-to-top', '@vuepress/medium-zoom'],
  themeConfig: {
    displayAllHeaders: false,
    activeHeaderLinks: false,
    nav: [
      { text: '首页', link: '/' },
      {
        text: '博客',
        items: [
          { text: 'github', link: 'https://github.com/fullyouth' },
          { text: 'csdn', link: 'https://blog.csdn.net/qq_31325079' },
          { text: '掘金', link: 'https://juejin.cn/user/4424090521969288'}
        ]
      },
    ],
    sidebar: [
      {
        title: 'js基础',
        sidebarDepth: 1,
        children: [
          '/js基础/继承.md',
        ]
      },
      {
        title: 'js深入',
        // path: '/js', 
        sidebarDepth: 1,
        children: [
          '/js/js之手写new.md',
          '/js/js之手写call-apply-bind.md',
          '/js/js之手写防抖函数.md',
        ]
      },
      {
        title: '网络',
        // path: '/js', 
        sidebarDepth: 1,
        children: [
          '/network/浏览器的缓存策略.md'
        ]
      }
    ]
  }
}
