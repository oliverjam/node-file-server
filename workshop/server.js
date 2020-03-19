const http = require("http");
const fs = require("fs");
const path = require("path");

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
    // serve the static files here
  } else {
    response.writeHead(404, { "content-type": "text/html" });
    response.end("<h1>Not found</h1>");
  }
});

server.listen(3000, () => console.log(`Listening at http://localhost:3000`));
