const http = require("http");

const server = http.createServer((req, res) => {
  res.end("server ok");
});

server.listen(process.env.PORT || 3000);
