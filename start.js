const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (url === "/") {
    console.log("/block");
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter text</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    console.log("/message block");
    const body = [];
    req.on("data", (chunk) => {
      console.log("Request 'data' block");
      console.log(chunk);
      body.push(chunk);
      console.log(`Body: ${body}`);
    });

    req.on("end", () => {
      console.log("Request 'end' block");
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=").at(1).split("+").join(" ");
      fs.writeFileSync("message.txt", message);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }

  if (url === "/page") {
    console.log("/page blcok");
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>First Node Html Page</title></head>");
    res.write("<body><h1>Welcome to my first Node html page</h1></body>");
    res.write("</html>");
    return res.end();
  }

  console.log("Last statement in global scope");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Node server is running on port 8000...");
});
