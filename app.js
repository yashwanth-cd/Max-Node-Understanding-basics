const http = require("http");
const fs = require("fs");
const { measureMemory } = require("vm");

const server = http.createServer((req, res) => {
  const reqUrl = req.url;
  const reqMethod = req.method;

  if (reqUrl === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>submit</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (reqUrl === "/message" && reqMethod === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first Html Page</title></head>");
  res.write("<body><h1>My first Html page using Node js</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Node server is running on port 3000...");
});
