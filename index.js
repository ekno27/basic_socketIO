var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log("Client Connected");
  
  socket.emit("hello");
  
  socket.on('How is it going', function(){
    console.log("I'm doing great. How about you?");
    socket.emit("great. you?")
  });

  socket.on('See you soon', ()=> {
    console.log('goodbye');
  })
  
  socket.on('disconnect', ()=> {
    console.log("User Disconnected");
  })
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});