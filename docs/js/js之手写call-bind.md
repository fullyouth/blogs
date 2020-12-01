# call-bind

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
> 请注意： 
1.如果这个函数处于==非严格模式==下，则指定为 ==null 或 undefined== 时会自动替换为指向全局对象，==原始值会被包装==。
2.若该方法没有返回值，则返回 undefined

```js
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
> argsArray是 一个数组或者类数组对象 这是与call的区别
apply
```js
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
