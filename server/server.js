var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var public = path.join(__dirname + '/../public');

var port = process.env.PORT || 3000 ;
var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(public));

io.on('connection', (socket) => {
    console.log('new user connected');
    
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'welcome to the chat app',
        createdAt: new Date().getTime()
    });
    
    /*socket.emit('newEmail', {
        from: 'kumarayush',
        text: 'hey',
        createAt: 123
    }); */
    
   /* socket.emit('newMessage', {
        from: 'server',
        text: 'hey'
    }); */
    
  /*  socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
    }); */
    
    socket.broadcast('newMessage', {
        from: 'Admin',
        text: 'new user joined',
        createdAt: new Date().getTime()
    })
    
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        }); 
      /*  socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });*/
    });
    
   socket.on('disconnect', () => {
       console.log('user disconnected');
   });
});

server.listen(port, () => {
    console.log(`server is up on port ${port}`);
});