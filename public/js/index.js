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
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    (e).preventDefault()
     
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {
        jQuery('[name=message]').val('')
    });
});









