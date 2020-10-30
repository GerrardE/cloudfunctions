const express = require("express");
const settings = require("./settings").settingsRouter;

const apiRouter = express.Router();

apiRouter.get("/", (req, res) =>
  res.status(200).send("Welcome to the cloudfunctions[sensei] api")
);

apiRouter.use("/settings", settings);

module.exports = { apiRouter };
