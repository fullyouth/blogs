# js之手写promise

## 1. Promise.all
```js
Promise.all = function (promises) {
  return new Promise(function (resolve, reject) {
    let result = [];
    let count = 0;
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(function (data) {
        result[i] = data;
        if (++count == promises.length) {
          resolve(result);
        }
      }, function (err) {
        reject(err);
      });
    }
  });
}
面试题
```
给定一组url，利用js的异步实现并发请求，并按顺序输出结果
```js
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
```
