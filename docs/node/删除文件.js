

const inquirer = require("inquirer")

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
const rootFiles = fs.readdirSync(curDir)

// 操作文件
rootFiles.forEach(name => {
  if (reg.test(name)) {
    deleteFileOrDir(name)
  }
});

function isDirectory(url) {
  return fs.statSync(url).isDirectory()
}

function deleteFileOrDir(url) {
  if (fs.existsSync(url)) {  //判断给定的路径是否存在
    const isDir = isDirectory(url)
    if (isDir) {
      let files = fs.readdirSync(url);   //返回文件和子目录的数组
      files.forEach(function (file) {
        let curPath = path.join(url, file);
        deleteFileOrDir(curPath);
      });
      // 删除目录
      fs.rmdirSync(url);
      if (rootFiles.includes(url)) {
        console.log(url + '--目录删除成功');
      }
    } else {
      //删除文件
      fs.unlinkSync(url);
      if (rootFiles.includes(url)) {
        console.log(url + '--文件删除成功');
      }
    }
    
  } else {
    console.log("给定的路径不存在！");
  }
}
