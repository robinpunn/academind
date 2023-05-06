const express = require("express");

const router = express.Router();

const userData = require("./add-user");

router.get("/", (req, res, next) => {
  const users = userData.users;
  res.render("users", {
    users,
    pageTitle: "Users",
    path: "/",
  });
});

module.exports = router;
