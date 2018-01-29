const express = require('express')
const app = express()
const server = require('http').createServer(app)
var io = require('socket.io')(server)

app.use("/styles",express.static(__dirname + "/styles"))

const port = process.env.port || 3000

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket){
    io.emit('log message', 'New user has joined!');
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    })
    socket.on('disconnect', function(){
        io.emit('log message', 'User has left!');
    })
})
  
server.listen(port, () => console.log("Listening on port " + port))