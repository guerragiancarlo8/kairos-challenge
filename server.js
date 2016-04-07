var express = require('express')
var http = require('http');
var session = require('express-session')
var bodyParser = require('body-parser')
var jwt = require("jwt-simple");
var path = require('path');

var app = express();
app.use(bodyParser.json());

app.all('/*',function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  next();
})

app.use(express.static(__dirname + '/swipeable_pages.html'))

app.use('/bower_components',express.static(path.join(__dirname + '/bower_components')));
app.use('/custom',express.static(path.join(__dirname+'/custom')));

app.get('/',function(req,res){

  res.sendfile('index.html');
})

app.get('/data', function(req,res){
  res.json({"days": ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]})
})

app.set('port', process.env.PORT || 3000)
var server = app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + server.address().port)
})


// SERVIDOR QUE ANTE CUALQUIER PETICIÓN DEVUELVE index.html SALVO LAS EXCEPCIONES PROGRAMADAS
