var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
// var routes 		   = require('./routes.js');
var jobHandler = require('./utils/jobHandler.js').handle;
var server = require('http').createServer()
  , url = require('url')
  , WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ server: server })
  , express = require('express')
  , app = express()
  , port = process.env.PORT || 3000;


// var port = process.env.PORT || 3000; 
app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(methodOverride('X-HTTP-Method-Override')); 
app.use(express.static(__dirname + '/public')); 

require('./utils/routes')(app); 
// app.listen(port);               
// console.log('Magic happens on port ' + port);
exports = module.exports = app;                         

app.use(function (req, res) {
  res.send({ msg: "hello" });
});

wss.on('connection', function connection(ws) {
  var location = url.parse(ws.upgradeReq.url, true);

  ws.on('message', function incoming(message) {
    var msg = JSON.parse(message);
    if(msg.type === "job"){
      jobHandler(ws, msg)
      .then(function() {
        ws.send("Job Complete", {mask: true});        
      })
    } else {
      ws.send("Not a Job", {mask: true});
    }
  });

});
 
server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });

