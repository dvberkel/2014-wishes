var express = require('express');
var app = express();
var server = require('http').createServer(app);

app.set('port', process.env.PORT || 3435);
app.use('/', express.static(__dirname));

server.listen(app.get('port'));
console.log('listening on %s', app.get('port'));
