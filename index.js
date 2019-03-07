var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log("Client Connected");
  
  socket.emit('greeting1', "hello");
  
  socket.on('greeting2', (payload)=>{
    console.log(payload);
    socket.emit('greeting3', "How are you?")
  });

  socket.on('greeting4', (payload)=> {
    console.log(payload);
  })
  
  socket.on('disconnect', ()=> {
    console.log("User Disconnected");
  })
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});