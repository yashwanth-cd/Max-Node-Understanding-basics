const fs = require("fs");

const requestHandler = (req, res) => {
  const { url, method } = req;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Initial Route</title></head>");
    res.write(
      "<body><form action='/create-user' method='POST'><input type='text' name='username'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
      console.log(chunk);
    });

    req.on("end", () => {
      const parsedData = Buffer.concat(body).toString();
      const message = parsedData.split("=").at(1).split("+").join(" ");
      console.log(parsedData);

      fs.writeFile("message.txt", message, (err) => {
        // if (err) return res.end("File could'nt be written");
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Users Route</title></head>");
    res.write(
      "<body><ul><li>User 1</li><li>User 2</li><li>User3</li></ul></body>"
    );
    res.write("</html>");
    return res.end();
  }
};

module.exports = requestHandler;
