var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var {generateMessage} = require('./utils/message')
var public = path.join(__dirname + '/../public');

var port = process.env.PORT || 3000 ;
var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(public));

io.on('connection', (socket) => {
    console.log('new user connected');
    
    socket.emit('newMessage', generateMessage('Admin', 'welcome to the chat app')  /*{
        from: 'Admin',
        text: 'welcome to the chat app',
        createdAt: new Date().getTime()
    } */ ); 
    
    /*socket.emit('newEmail', {
        from: 'kumarayush',
        text: 'hey',
        createdAt: 123
    }); */
    
   /* socket.emit('newMessage', {
        from: 'server',
        text: 'hey'
    }); */
    
  /*  socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
    }); */
    
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user connected')  /*{
        from: 'Admin',
        text: 'new user joined',
        createdAt: new Date().getTime()
    }  */ );
    
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text)
                
                /* {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        } */ ); callback();
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