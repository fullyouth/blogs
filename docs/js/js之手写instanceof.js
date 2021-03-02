function newInstanceof(V, F) {
  if (Object.prototype.toString.call(V) !== '[object Object]') {
    return false
  }
  let O = F.prototype
  console.log(O)
  if (Object.prototype.toString.call(O) !== '[object Object]') {
    return false
  }
  while(true) {
    V = Object.getPrototypeOf(V)
    if (V === null) return false
    if (V === O) return true
  }
}

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