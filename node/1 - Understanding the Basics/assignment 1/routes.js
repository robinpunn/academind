const existingUsers = ["User 1", "User 2", "User 3", "User 4"];
const users = [...existingUsers];

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Hello There</title></head>");
    res.write("<body>");
    res.write("<h1>Hello There</h1>");
    res.write(
      "<form action='/create-user' method='POST'><input type='text' name='username'><button type='submit'>Send</button></form>"
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/users") {
    res.write("<html>");
    res.write("<head><title>Users</title></head>");
    res.write("<body><ul>");
    for (const user of users) {
      res.write(`<li>${user}</li>`);
    }
    res.write("</ul></body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const user = parsedBody.split("=")[1];
      console.log(user);
      users.push(user);
      res.statusCode = 302;
      res.setHeader("Location", "/users");
      return res.end();
    });
  }
};

module.exports.handler = requestHandler;
