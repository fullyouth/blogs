function a () {
  let b = {
    name: '123'
  }
  let name = b.name
  setTimeout(function() {
    debugger
    conslole.log(name)
  })
  // b = null
}

let c = a()