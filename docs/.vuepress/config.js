module.exports = {
  base: '/blogs/',
  title: 'fullyouth',
  description: '前端,个人博客,javascript',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    displayAllHeaders: true,
    activeHeaderLinks: true,
    nav: [
      { text: '首页', link: '/' },
      {
        text: '博客',
        items: [
          { text: 'csdn', link: 'https://blog.csdn.net/qq_31325079' },
        ]
      },
    ],
    sidebar: [
      {
        title: 'js深入',
        // path: '/js', 
        sidebarDepth: 1,
        children: [
          '/js/js之手写new.md',
          '/js/js之手写call-bind.md',
        ]
      }
    ]
  }
}
