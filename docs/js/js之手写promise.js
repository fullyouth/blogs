function printOrder(urlArr) {
  let length = urlArr.length
  let count = 0
  let result = []
  for(let i = 0; i < length; i ++) {
    let url = urlArr[i]
    ajax(url).then((res) => {
      result[i] = res
      count++
      if (count >= length) {
        log()
      }
    }).catch(err => {
      result[i] = res
      count++
      if (count >= length) {
        log()
      }
    })
  }
  function log() {
    console.log(result)
  }
}

function ajax(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: url })
    }, 1000)
  })
}
printOrder(['www.baidu.com','www.alibaba.com','www.hhh.com'])