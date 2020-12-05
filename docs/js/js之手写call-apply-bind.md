# js之手写call-apply-bind
## call

```js
/**
 * 
 * @param {*} thisArg: 在 function 函数运行时使用的 this 值
 * @param {*} arg1 arg2 指定的参数列表
 * @return 使用调用者提供的 this 值和参数调用该函数的返回值
 */
function.call(thisArg, arg1, arg2, ...)
```
::: tip 
1.如果这个函数处于==非严格模式==下，则指定为 ==null 或 undefined== 时会自动替换为指向全局对象，==原始值会被包装==。

2.若该方法没有返回值，则返回 undefined
:::
代码实现 :tada:
```js{5}
Function.prototype.call = function (context, ...args) {
  if (context === null || context === undefined) {
    context = window
  } else {
    context = Object(context) // 原始值会被包装 如果是非原始值会直接返回
  }
  context.fn = this
  let ret = context.fn(...args)
  delete context.fn
  return ret
}
```
call 测试代码
```js
function sayName(hello) {
  console.log(hello + this.name)
  return hello + this.name
}

const person = {
  name: 'zhang'
}
sayName.call(null, '你好啊~，');
sayName.call(undefined, '你好啊~，');
let ret = sayName.call(person, '你好啊~，');
console.log(ret)




function logThis() {
  console.log(this)
}
logThis.call(Symbol(1))
logThis.call(true)
logThis.call(1)
logThis.call('abc')
logThis.call(BigInt(132))
```

## apply
```js
/**
 * 
 * @param {*} thisArg: 在 function 函数运行时使用的 this 值
 * @param {*} argsArray 可选的，一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 func 函数 如果该参数的值为 null 或  undefined，则表示不需要传入任何参数
 * @return 函数的返回结果
 */
function.apply(thisArg, argsArray)
```
::: tip 
argsArray是 一个数组或者类数组对象 这是与call的区别
:::
apply
```js{6}
Function.prototype.apply = function (context, argsArray) {
  if (context === null || context === undefined) {
    context = window
  }
  context.fn = this
  let ret = context.fn(...Array.from(argsArray))
  // let ret = context.fn(...Array.prototype.slice.call(argsArray)) // 正确
  // let ret = context.fn(...argsArray) // 错误的 ❌ 不可被迭代
  delete context.fn
  return ret
}
```
apply测试代码
```js
function sayName(hello) {
  console.log(hello + this.name)
  return hello + this.name
}

const person = {
  name: 'zhang'
}

sayName.apply(person, {0:'你好啊~，', length: 1});
sayName.apply(undefined, ['你好啊~，']);
let ret2 = sayName.apply(person, ['你好啊~，']);
console.log(ret2)
```

## 3.bind
### 3.1 概念
bind方法创建一个新的函数
在bind被调用时，这个新函数的this被指定为bind的第一个参数
而其余参数将作为新的函数的参数，供调用使用

### 3.2 语法
```js
function.bind(thisArg, arg1, arg2, ...)
```
### 3.3参数
- thisArg: 
调用绑定函数时作为`this`参数传递给目标函数的值。
如果使用`new`运算符构造`绑定函数`，则忽略该值。
当使用 `bind` 在 `setTimeout` 中创建一个函数（作为回调提供）时，作为 `thisArg` 传递的任何原始值都将转换为 `object`
如果 `bind` 函数的参数列表为空，或者`thisArg`是`null`或`undefined`，`执行作用域的 this` 将被视为新函数的 `thisArg`

- arg1, arg2, ...
当目标函数被调用时，被预置入绑定函数的参数列表中的参数

### 3.4返回值
返回一个原函数的拷贝，并拥有指定的 `this` 值和初始参数

### 3.5 实现 :tada:
```js
Function.prototype.bind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  let self = this
  let fBound = function (...args2) {
    return self.call(this instanceof self ? this : context, ...args, ...args2)
  }
  fBound.prototype = Object.create(self.prototype)
  return fBound
}
```

