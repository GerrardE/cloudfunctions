const express = require("express");
const users = require("../../controllers/users").UsersController;

const usersRouter = express.Router();

usersRouter.post("/", users.create);
usersRouter.get("/:id", users.getOne);
usersRouter.get("/", users.getAll);
usersRouter.put("/:id", users.update);
usersRouter.delete("/:id", users.delete);

module.exports = { usersRouter };
