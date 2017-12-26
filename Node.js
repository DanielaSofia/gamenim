var http = require('http');
var url = require('url');
var crypto = require('crypto');
var fs = require("fs");
var webSocketServer = new WebSocketServer({ httpServer: httpServer});

require("./index.js");

var server = http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Método: '+request.method+'\n');
    response.end('\n');
});

server.listen(8040);

http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url,true);    
    var pathname = parsedUrl.pathname;
    
 
}).listen(8040);
    
var body = "";
switch(request.method) {
    
    case "POST":    
        request
            .on("data", (chunk) => { body += chunk;  })
            .on("end", () => {
               try { query = JSON.parse(body);  /* processar query */ }
               catch(err) {  /* erros de JSON */ }
            })
            .on("error", (err) => { console.log(err.message); });
    break;
    //...
  }

 
webSocketServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);
    remember(connection);
    connection.sendUTF(JSON.stringify({ "board": board, "current": current }));

    connection.on('message', function(message) {
    if (message.type === 'utf8') {
         process(JSON.parse(message.utf8Data));
    } else
        console.log("Unsupported message type: "+message.type);
    });
    connection.on('close', function(connection) { forget(connection);});
});        