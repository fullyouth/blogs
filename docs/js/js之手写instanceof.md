# js之手写instanceof
参考ecma文档： http://yanhaijing.com/es5/#331
```js
F.HasInstance(V)
HasInstance(V, F) {
  if (V不是Object) return false
  let O = F.prototype
  if (O不是Object) return false
  while(true) {
    V = V.__proto__
    if (V === null) return false
    if (O === V) return true
  }
}
```

```js
function newInstanceof(V, F) {
  if (Object.prototype.toString.call(V) !== '[object Object]') {
    return false
  }
  let O = F.prototype
  if (Object.prototype.toString.call(O) !== '[object Object]') {
    return false
  }
  while(true) {
    V = Object.getPrototypeOf(V)
    if (V === null) return false
    if (V === O) return true
  }
}

// 测试代码
class Person {
  constructor(name) {
    this.name = name
  }
}

class Student extends Person {
  constructor(name) {
    super(name)
  }
}

const zhang = new Student('zhang')
console.log(newInstanceof(zhang, Person))
```