var socket = io();
        socket.on('connect', function() {
            console.log('connected to server');
        });
/* socket.emit('createEmail', {
    to: 'ayush',
    text: 'hi from index.js'
}) */

/*socket.emit('createMessage', {
    from: 'client',
    text: 'hello'
}); */

socket.on('disconnect',  function() {
            console.log('disconnected from the server');
        });
 
/*socket.on('newEmail', function(email) {
    console.log('new email', email);
}); */

socket.on('newMessage', function(message) {
    console.log('newMessage', message);
});









