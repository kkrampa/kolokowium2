/* jshint node: true */
var express = require('express');
var app = express();
var morgan = require('morgan');
var favicon = require('serve-favicon');
var baza = require('./db/taffy-min.js').taffy(require('./db/gminy').gminy);
var sortfun = require('./sort');

var port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components/jquery/dist'));
app.use(express.static(__dirname + '/bower_components/fontawesome'));

app.get('/api/:woj/:reg', function (req, res) {
    var json = baza({
        woj: req.params.woj, // <= do zmiany
        gmina: {
            regex: new RegExp(req.params.reg) // <= do zmiany
        }
    }).select('gmina');
    res.json(json.sort(json.sort(sortfun)));
});

app.get('/api/:woj', function (req, res) {
    var json = baza({
        woj: req.params.woj // <= do zmiany
    }).select('gmina');
    res.json(json.sort(sortfun));
});

app.listen(port, function () {
    console.log('Serwer działa na porcie ' + port);
});


