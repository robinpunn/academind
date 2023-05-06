const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const addRoute = require("./routes/users");
const usersRoute = require("./routes/add-user");
const errorRoute = require("./routes/404")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(addRoute);
app.use(usersRoute.routes);
app.use(errorRoute)

app.listen(3000);
