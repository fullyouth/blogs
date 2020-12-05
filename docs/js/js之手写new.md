# js之手写new

## new 都做了什么？
1. 创建一个空对象({})
2. 链接该对象到另外一个对象
3. 将创建的空对象作为this的上下文
4. 如果该函数没有返回对象，则返回this

高程4
1. 在内存中创建一个新对象
2.  这个新对象内部的 [[Prototype]] 指针被赋值为构造函数的 prototype 属性
3.  构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）
4.  执行构造函数内部的代码（给新对象添加属性）
5.  如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象

## 实现new
```js
// 模拟new关键字
function _new(constructor, ...args) {  
  // let obj = {}                            // 1. 创建一个空对象({})
  // obj.__proto__ = Func.prototype          // 2. 链接该对象到另外一个对象
  let obj = Object.create(Func.prototype)    // 替代1 2
  const ret = constructor.call(obj, ...args) // 3. 将创建的空对象作为this的上下文
  return typeof ret === 'object' ? ret : obj // 4. 如果该函数没有返回对象，则返回this
}
```

## 测试代码
```js
function _new(constructor, ...args) {  
  let obj = Object.create(Func.prototype)   
  const ret = constructor.call(obj, ...args) 
  return typeof ret === 'object' ? ret : obj 
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.getAge = function(){
  return this.age
}


let zhang = _new(Person, 'zhang', 18);
console.log('_new', zhang)

let jiao = new Person('jiao', 18)
console.log('new', jiao)

console.log(jiao.__proto__.too === zhang.__proto__.too)
console.log(jiao.getAge(), zhang.getAge())
```