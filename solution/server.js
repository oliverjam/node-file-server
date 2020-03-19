const http = require("http");
const fs = require("fs");
const path = require("path");

const types = {
  html: "text/html",
  css: "text/css",
  js: "application/javascript",
  jpg: "image/jpeg",
  ico: "image/x-icon",
};

const server = http.createServer((request, response) => {
  const url = request.url;
  if (url === "/") {
    const filePath = path.join(__dirname, "public", "index.html");
    fs.readFile(filePath, (error, file) => {
      if (error) {
        console.log(error);
        response.writeHead(404, { "content-type": "text/html" });
        response.end("<h1>Not found</h1>");
      } else {
        response.writeHead(200, { "content-type": "text/html" });
        response.end(file);
      }
    });
  } else if (url.includes("public")) {
    const urlArray = request.url.split(".");
    const extension = urlArray[1];
    const type = types[extension];
    const filePath = path.join(__dirname, url);
    fs.readFile(filePath, (error, file) => {
      if (error) {
        console.log(error);
        response.writeHead(404, { "content-type": "text/html" });
        response.end("<h1>Not found</h1>");
      } else {
        response.writeHead(200, { "content-type": type });
        response.end(file);
      }
    });
  } else {
    response.writeHead(404, { "content-type": "text/html" });
    response.end("<h1>Not found</h1>");
  }
});

server.listen(3000, () => console.log(`Listening at http://localhost:3000`));
