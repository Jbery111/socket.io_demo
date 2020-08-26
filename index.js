var express = require('express');
const app = express();
var server = require('http').createServer(app);
const io = require('socket.io')(server);
// 在服务器端能够将console出来的信息显示出不同的颜色
const chalk = require('chalk');
// 使用静态目录
app.use("/static", express.static(__dirname + "/public"))

io.on('connection', (socket) => {
  // console.log('a user connected'); //客户端应该连接上才能打印出来,客户端连接到服务器需要通过socket.io.js(在public目录下)
  console.log(socket.id) //客户端每一次连接都会创建一个新的socket.id
  socket.on('login', (msg) => {
    io.emit('userlogin', msg)
  });

  socket.on('senMsg', (msg) => {
    // console.log(msg)
    io.emit('receiveMsg', msg)
  });
});

app.get('/', (req, res) => {
  console.log(__dirname) //全路径C:\Users\ZYY\Desktop\js练习记录\20200826练习\chat-app-demo
  res.sendfile(__dirname + '/index.html');
});


server.listen(3000, () => {
  console.log(chalk.hex('#DEADED').bold('server is running at http://localhost:3000'))
})