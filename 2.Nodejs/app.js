const http = require("http"); //HTTP module

function handleRequest(request, response) {
  if (request.url === "/") {
    response.statusCode = 200;
    response.end("<h1>Understanding Nodejs</h1>");
  } else if (request.url === "/currenttime") {
    response.statusCode = 200;
    response.end("<h1>" + new Date().toISOString() + "</h1>");
  } else {
    response.statusCode = 404;
    response.end("<h1>Invalid Request!</h1>");
  }
}

const server = http.createServer(handleRequest); //Server Creation

server.listen(3000); //Allow server to listen to incoming request
