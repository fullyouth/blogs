const path = require('path')
const fs = require('fs')
const root = path.join(__dirname, '../')
const menus = [
  {
    title: 'js基础',
    path: '/js基础'
  },
  {
    title: 'js深入',
    path: '/js'
  },
  {
    title: '网络',
    path: '/network',
  },
  {
    title: '面试题',
    path: '/面试题',
  },
  {
    title: '设计模式',
    path: '/design-pattern',
  },
  {
    title: '算法',
    path: '/arithmetic',
  },
  {
    title: 'node',
    path: '/node',
  },
  {
    title: '微信小程序',
    path: '/mini-program'
  }
]

const sidebar = menus.map(menu => {
  let ret = {}
  ret.title = menu.title
  ret.sidebarDepth = 1
  
  let path = root + menu.path
  let mds = fs.readdirSync(path).filter(item => /\.md$/.test(item))
  ret.children = mds.map(md => {
    return menu.path + '/' + md
  })
  console.log(ret)
  return ret
})



module.exports = {
  sidebar
} 