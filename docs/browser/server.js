var http = require('http');
var fs = require('fs');
var path = require('path')
var server = http.createServer(function (req, res) {
  var url = req.url;
  var file = path.resolve(__dirname, '.' + url);
  console.log(file);

  fs.readFile(file, function (err, data) {
    console.log(err)
    if (err) {
      res.writeHeader(404, {
        'content-type': 'text/html;charset="utf-8"'
      });
      res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
      res.end();
    } else {
      res.writeHeader(200, {
        'content-type': '	text/css'
      });
      setTimeout(() => {
        res.write(data);//将index.html显示在客户端
        res.end();
      }, 3000)
    }

  });
}).listen(8080);
