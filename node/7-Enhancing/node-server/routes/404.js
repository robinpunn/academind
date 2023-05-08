const express = require("express");

const errorController = require("../controllers/404");

const router = express.Router();

router.use("/", errorController.error);

module.exports = router;
