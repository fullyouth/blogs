# js之手写继承
## 题目
```js
// 这个是要实现的方法
function extends (childClass, parentClass) {

}

// 这是个 es6 的一个例子，要实现 extends 的功能。
class Man extends Human {
  constructor (args) {
    super(args)
    // xxxxx
  }

  speak() {
    console.log('')
  }
}
```
## 实现
```js
function extends(childClass, parentClass) {
  const proto = Object.create(parentClass.prototype) // 不使用__proto__是因为浏览器支持不够好
  childClass.constructor = parentClass
  childClass.prototype = proto
}
// 继承父类成员属性 使用call
function childClass () {
  parentClass.call(this)
}
```