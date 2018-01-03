var http = require('http');
var url = require('url');
var crypto = require('crypto');
var fs = require("fs");
var port = 8040;
var headers = {
    plain: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'        
    },
    sse: {    
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Connection': 'keep-alive'
    }
};
var webSocketServer = new WebSocketServer({ httpServer: httpServer});

require("./index.js");


http.createServer(function (request, response) {
    var path= url.parse(request.url,true);
    var pathname = path.pathname;
    var answer = {};
    var body = " ";

    switch(request.method) {
    case "GET":
        answer = doGet(pathname,request,response);
        break;
    case "POST":
        answer = doPost(pathname);
    default:
        answer.status = 400;
    }

}).listen(PORT);

/*
http.createServer(function (request, response) {
           
   if(answer.status === undefined)
       answer.status = 200;
   if(answer.style === undefined)
       answer.style = "plain";

   response.writeHead(answer.status, headers[answer.style]);
   if(answer.style === "plain")
       response.end();
}).listen(PORT);

*/
function doGet(pathname,request,response) {
    var answer = {};
    switch(pathname) {
        case "/update":
            updater.remember(response);
            request.on('close', () => updater.forget(response));
            setImmediate(() => updater.update( counter.get())); 
            answer.style = "sse";
        break;
        
        default:
            answer.status = 400;
        break;
    }
    return answer;
}


function doPost(pathname) {
    var answer = {};
   
    switch(pathname) {
        case "/register":
            counter.incr();
            updater.update(counter.get());
        break;
        
        case "/ranking":
            counter.reset();
            updater.update(counter.get());
        break;
     
        default:
            status = 400;
        break;
     }
   
    return answer;
   }

/*
var server = http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Método: '+request.method+'\n');
    response.end('\n');
});

server.listen(port);

http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url,true);    
    var pathname = parsedUrl.pathname;
    
 
}).listen(port);
    
 
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
});        */