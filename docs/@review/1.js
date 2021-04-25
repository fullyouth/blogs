// new的过程
function _new(constructor, ...args) {
  // 1. 创建一个空对象
  let obj = {}
  // 2. 将该对象的原型链执行 构造函数的原型
  obj.__proto__ = constructor.prototype
  // 3. 构造函数确定this
  let ret = constructor.call(obj, ...args)
  // 4. return 
  return typeof ret == 'object' ? ret : obj
}

// bind call apply
Function.prototype.call = function(context, ...args) {
  if (context == null || context == undefined) {
    context = window
  } else {
    context = Object(context)
  }
  context.fn = this
  let ret = context.fn(...args)
  delete context.fn
  return ret
}

Function.prototype.apply = function(context, args) {
  if (context == null || context == undefined) {
    context = window
  }
  context.fn = this
  let ret = context.fn(...Array.from(args))
  delete context.fn
  return ret
}

Function.prototype.bind = function(context, ...args) {
  let self = this

  let fBound = function(...args2) {
    return self.call(this instanceof self ? this : context, ...args, ...args2)
  }
  fBound.prototype = Object.create(self.prototype) // 原型继承
  return fBound
}
