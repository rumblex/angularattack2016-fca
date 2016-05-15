var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
var integer = 0;
var time = 1/10000*1.5;

function timezone()
{
	if(integer>=2147483646){
		integer=0;
	}
   integer=integer+.0001;
   //console.log(integer);
   setTimeout(timezone, time);
}
timezone();


function timesync()
{
   io.emit('time', integer);
   setTimeout(timesync, 5000);
}
timesync();

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
	io.emit('chat message', integer);
	io.emit('time', integer);
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
