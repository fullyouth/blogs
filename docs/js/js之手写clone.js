// /**
//  * done
//  * - 克隆对象、数组
//  * - 循环克隆
//  * 
//  * todo
//  * https://cloud.tencent.com/developer/article/1497418
//  * 垃圾回收
//  * Map weakMap
//  * 多种数据类型
//  * for in ...    __proto__
//  */
// // 浅拷贝
// function shadowClone(target) {
//   let cloneTarget = {}
//   for (let key in target) {
//     cloneTarget[key] = target[key]
//   }
//   return cloneTarget
// }

// // todo for in  原型链寻找的方式
// // 深拷贝
// function deepClone(target, map = new Map()) {
//   if (typeof target === 'object') {
//     let cloneTarget = Array.isArray(target) ? [] : {}
//     if (map.get(target)) {
//       return map.get(target)
//     }
//     map.set(target, cloneTarget)
//     for (let key in target) {
//       cloneTarget[key] = deepClone(target[key], map)
//     }
//     return cloneTarget
//   }
//   return target
// }
// const obj = {
//   name: 'zhq',
//   person: {
//     name: 'haoqi',
//     age: ''
//   }
// }
// obj.person.age = obj
// // obj.__proto__.ss = '123'
// const clone = deepClone(obj)
// console.log(obj)
// console.log(clone)

// obj.person.name = 'z'
// console.log(obj)
// console.log(clone)


// // String.prototype.substring() // 子串  indexStart[, indexEnd]
// // String.prototype.substr() // 子串  start[, length]
// // String.prototype.slice() // 截取 beginIndex[, endIndex]  // 返回新的
// // String.prototype.split() // 分割

var checkValidString = function(s) {
  let leftStack = []
  let starStack = []
  while (s.length > 0) {
    let splitChat = s.substring(0, 1)
    if (splitChat === '(') {
      leftStack.push(splitChat)
    } else if (splitChat === '*') {
      starStack.push(splitChat)
    } else {
      // )
      if (leftStack.length > 0) {
        leftStack.pop()
      } else if (starStack.length > 0) {
        starStack.pop()
      } else {
        return false
      }
    }
    console.log(leftStack)
    console.log(starStack)
    console.log('========')
    s = s.substring(1, s.length)
  }
  
  return starStack.length >= leftStack.length
}
let test = '**(((()))'
// let test = "(((((*(()((((*((**(((()()*)()()()*((((**)())*)*)))))))(())(()))())((*()()(((()((()*(())*(()**)()(())"
const a = checkValidString(test)
console.log(a)


// function a (){
//   let name = Math.random()
//   return function () {
//     return name
//   }
// }

// let fn = a()
// console.log(fn())
// showMem()
// console.log(fn())
// showMem()
// console.log(fn())
// showMem()
// console.log(fn())
// showMem()


// function showMem() {
//   function format(bytes) {
//     return (bytes / 1024 / 1024).toFixed(2) + 'MB'
//   }
//   let mem = process.memoryUsage()
//   console.log('heapTotal：' + format(mem.heapTotal))
//   console.log('heapUsed ：' + format(mem.heapUsed))
//   console.log('--------------------------')
// }

// // function useMem() {
// //   let size = 20 * 1024 * 1024
// //   let arr = new Array(size)
// //   arr.fill(0)
// //   return arr
// // }

// // let total = []
// // for(let i = 0; i < 15; i++) {
// //   showMem()
// //   total.push(useMem())
// // }
// // showMem()