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
          '/js基础/模块化的区别.md'
        ]
      },
      {
        title: 'js深入',
        sidebarDepth: 1,
        children: [
          '/js/js之手写new.md',
          '/js/js之手写call-apply-bind.md',
          '/js/js之手写防抖函数.md',
          '/js/js之手写继承.md',
          '/js/js之手写instanceof.md',
          '/js/js之手写clone.md'
        ]
      },
      {
        title: '网络',
        sidebarDepth: 1,
        children: [
          '/network/浏览器的缓存策略.md'
        ]
      },
      {
        title: '面试题',
        sidebarDepth: 1,
        children: [
          '/面试题/总结.md'
        ]
      },
      {
        title: '设计模式',
        sidebarDepth: 1,
        children: [
          '/design-pattern/概览.md'
        ]
      },
      {
        title: '算法',
        sidebarDepth: 1,
        children: [
          '/arithmetic/算法题.md',
          '/arithmetic/编程题.md',
        ]
      }
    ]
  }
}
