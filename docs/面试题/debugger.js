function add(...args) {
  return args.reduce((a, b) => a + b)
}
const sum = currying1(add)
function currying1(fn) {
  let nums = []
  function result(...args) {
    if (args.length === 0) {
      return fn(...nums)
    } else {
      nums.push(...args)
      return result
    }
  }
  return result
}
const fn = sum(1)(2)(3, 4, 5)(6)
const a = fn()
console.log(a)