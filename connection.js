var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Mark');

var hbs = require('hbs');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
    res.render('mark1.hbs', {
        pageTitle: 'NODE JS'
    });
});



app.listen(3000, () => {
    console.log('server is up on port 3000');
});