## 错误类型 
6种
```js
Error
EvalError
RangeError
ReferenceError
SyntaxError
TypeError
URIError
```

### Error
基类型，其他继承自该类型

### EvalError

### RangeError
```js
let items = new Array(-20)

RangeError: Invalid array length
    at Object.<anonymous> (/Users/zhanghaoqi/vuepress-FE/docs/读书笔记/test.js:1:13)
    at Module._compile (internal/modules/cjs/loader.js:1063:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
    at Module.load (internal/modules/cjs/loader.js:928:32)
    at Function.Module._load (internal/modules/cjs/loader.js:769:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
    at internal/main/run_main_module.js:17:47
```

### ReferenceError
通常在访问不到变量的时候，就会发生这个问题
```js
var obj = X;

ReferenceError: X is not defined
    at Object.<anonymous> (/Users/zhanghaoqi/vuepress-FE/docs/读书笔记/test.js:1:11)
    at Module._compile (internal/modules/cjs/loader.js:1063:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
    at Module.load (internal/modules/cjs/loader.js:928:32)
    at Function.Module._load (internal/modules/cjs/loader.js:769:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
    at internal/main/run_main_module.js:17:47
```

### SyntaxError
```js
a ++ b
     ^
SyntaxError: Unexpected identifier
    at wrapSafe (internal/modules/cjs/loader.js:979:16)
    at Module._compile (internal/modules/cjs/loader.js:1027:27)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
    at Module.load (internal/modules/cjs/loader.js:928:32)
    at Function.Module._load (internal/modules/cjs/loader.js:769:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
    at internal/main/run_main_module.js:17:47
```

### TypeError
TypeError类型在JavaScript中会经常用到，在变量中保存着意外的类型时，或者在访问不存在的方法时，都会导致这种错误。错误的原因虽然多种多样，但归根结底还是由于在执行特定于类型的操作时，变量的类型并不符合要求所致。

最常发生类型错误的情况，就是传递给函数的参数事先未经检查，结果传入类型与预期类型不相符

```js
let c = {}
c.split()

TypeError: c.split is not a function
    at Object.<anonymous> (/Users/zhanghaoqi/vuepress-FE/docs/读书笔记/test.js:8:3)
    at Module._compile (internal/modules/cjs/loader.js:1063:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
    at Module.load (internal/modules/cjs/loader.js:928:32)
    at Function.Module._load (internal/modules/cjs/loader.js:769:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
    at internal/main/run_main_module.js:17:47
```

### URIError
在使用encodeURI()或decodeURI()，而URI格式不正确时，就会导致URIError错误

## 使用场景
使用try-catch最适合处理那些我们无法控制的错误  
在明明白白地知道自己的代码会发生错误时，再使用try-catch语句就不太合适了

## 抛出错误
throw 操作符
```js
throw 123456
throw  "hello"
throw true
throw { name: '123' }
```
在遇到throw操作符时，代码会立即停止执行。仅当有try-catch语句捕获到被抛出的值时，代码才会继续执行。

也可以使用内置错误类型
```js
throw new Error('...')

```

也可以 继承Error创建自定义错误类型
```js
function CustomError(message) {
  this.name = 'customError'
  this.message = message
}

Custom.prototype = new Error()

throw new CustomError('...')
```

## 抛出错误和使用try catch
关于何时该抛出错误，而何时该使用try-catch来捕获它们，是一个老生常谈的问题。一般来说，应用程序架构的较低层次中经常会抛出错误，但这个层次并不会影响当前执行的代码，因而错误通常得不到真正的处理。如果你打算编写一个要在很多应用程序中使用的JavaScript库，甚至只编写一个可能会在应用程序内部多个地方使用的辅助函数，我都强烈建议你在抛出错误时提供详尽的信息。然后，即可在应用程序中捕获并适当地处理这些错误。

说到抛出错误与捕获错误，我们认为只应该捕获那些你确切地知道该如何处理的错误。捕获错误的目的在于避免浏览器以默认方式处理它们；而抛出错误的目的在于提供错误发生具体原因的消息。

## error事件
任何没有通过try-catch处理的错误都会触发window对象的error事件。这个事件是Web浏览器最早支持的事件之一
```js
window.onerror = function(message, url, line) {
  alert(message)
}
```
通过返回false，这个函数实际上就充当了整个文档中的try-catch语句，可以捕获所有无代码处理的运行时错误

## 常见的错误类型
1. 类型转换错误
2. 数据类型错误
3. 通信错误

