const express = require("express");

const app = express();

// app.use((req, res, next) => {
//   console.log("the first one");
//   next();
// });

// app.use((req, res, next) => {
//   console.log("the second one");
//   res.send("<h1>The title</h1>");
// });

app.use("/users", (req, res, next) => {
  console.log("the user page");
  res.send("<ul><li>User 1</li><li>User 2</li><li>User 3</li></ul>");
});

app.use("/", (req, res, next) => {
  console.log("the home page");
  res.send("<h1>The Title</h1>");
});

app.listen(3000);
