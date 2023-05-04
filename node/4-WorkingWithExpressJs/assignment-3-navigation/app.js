const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const addUserRoutes = require("./routes/adduser");
const usersRoutes = require("./routes/users");
const homeRoutes = require("./routes/home");
const errorRoute = require("./routes/404");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", addUserRoutes);
app.use(usersRoutes);
app.use(homeRoutes);
app.use(errorRoute);

app.listen(3000);
