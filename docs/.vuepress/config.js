module.exports = {
  base: 'https://github.com/fullyouth',
  title: 'fullyouth',
  description: '前端,个人博客,javascript',
  head: [
    ['link', { rel: 'icon', href: 'favicon.ico' }]
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
        children: [
          '/js/js之手写new.md',
        ]
      }
    ]
  }
}
