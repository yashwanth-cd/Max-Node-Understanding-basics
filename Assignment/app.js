const http = require("http");
const routes = require("./routes");

const server = http.createServer(routes);

server.listen(3000, "127.0.0.1", () => {
  console.log("Server is running on port 3000...");
});
