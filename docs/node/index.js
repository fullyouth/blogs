
const fs = require('fs')
const path = require('path')

// 获取参数
const args = process.argv.slice(2)
const regStr = args[0]
if (!regStr) {
  threw('请输入规则')
}
const reg = new RegExp(regStr)

// 查找文件
const curDir = process.cwd()
const files = fs.readdirSync(curDir)

// 操作文件
files.forEach(filename => {
  console.log(typeof filename)
  if (filename.test(reg)) {
    fs.unlink(filename, (err) => {
      if (err) {
        console.log(filename + '--删除成功');
      } else {
        console.log(filename + '--删除失败');
      }
    })
  }
});
