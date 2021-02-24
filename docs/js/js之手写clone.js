/**
 * done
 * - 克隆对象、数组
 * - 循环克隆
 * 
 * todo
 * https://cloud.tencent.com/developer/article/1497418
 * 垃圾回收
 * Map weakMap
 * 多种数据类型
 * for in ...    __proto__
 */
// 浅拷贝
function shadowClone(target) {
  let cloneTarget = {}
  for (let key in target) {
    cloneTarget[key] = target[key]
  }
  return cloneTarget
}

// todo for in  原型链寻找的方式
// 深拷贝
function deepClone(target, map = new Map()) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {}
    if (map.get(target)) {
      return map.get(target)
    }
    map.set(target, cloneTarget)
    for (let key in target) {
      cloneTarget[key] = deepClone(target[key], map)
    }
    return cloneTarget
  }
  return target
}
const obj = {
  name: 'zhq',
  person: {
    name: 'haoqi',
    age: ''
  }
}
obj.person.age = obj
// obj.__proto__.ss = '123'
const clone = deepClone(obj)
console.log(obj)
console.log(clone)

obj.person.name = 'z'
console.log(obj)
console.log(clone)