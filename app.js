const express = require('express')
const app = express()
const server = require('http').createServer(app)
var io = require('socket.io')(server)

const port = process.env.port || 3000

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    })
    socket.on('disconnect', function(){

    })
})
  
server.listen(port, () => console.log("Listening on port " + port))