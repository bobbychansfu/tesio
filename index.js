var express = require('express')
var http = require('http')
var app = express()
var server = http.createServer(app)

const { Server } = require("socket.io")
const io = new Server(server)

var clients = 0;

app.use(express.static("./public"))

io.on('connection', function(socket){
  console.log("socket connected")
  clients++;

  socket.emit('clientChange',clients) // emits only to the socket client
  socket.broadcast.emit('clientChange',clients) // emit to everyone except socket client
 
  //socket.emit("message", `You're connected as ${socket}`)

  socket.on('chat', function(message){
    io.emit('message',message)  // sends to everyone
  })
  
  socket.on('disconnect', function(){
    clients--
    socket.broadcast.emit('clientChange',clients)
  })

})

const port = parseInt(process.env.PORT) || 8080;
server.listen(port, ()=> {
  console.log(`listening on port ${port}`)
})

