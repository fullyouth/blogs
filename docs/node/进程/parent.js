const subprocess = require('child_process').fork('./child.js');

// 打开 server 对象，并发送该句柄。
const server = require('net').createServer();
server.on('connection', (socket) => {
  socket.end('由父进程处理');
});
server.listen(1337, () => {
  subprocess.send('server', server);
  server.close()
});