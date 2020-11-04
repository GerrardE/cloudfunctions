const express = require("express");
const settings = require("./settings").settingsRouter;
const blacklists = require("./blacklists").blacklistsRouter;
const users = require("./users").usersRouter;

const apiRouter = express.Router();

apiRouter.get("/", (req, res) =>
  res.status(200).send("Welcome to the cloudfunctions[sensei] api")
);

apiRouter.use("/settings", settings);
apiRouter.use("/blacklists", blacklists);
apiRouter.use("/users", users);

module.exports = { apiRouter };
