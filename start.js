const http = require("http");
const routes = require("./routes");

// const server = http.createServer(routes.handler);
const server = http.createServer(routes);

server.listen(8000, "127.0.0.1", () => {
  console.log("Node server is running on port 8000...");
});
