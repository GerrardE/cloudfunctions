const express = require("express");
const blacklists = require("../../controllers/blacklists").BlacklistsController;

const blacklistsRouter = express.Router();

blacklistsRouter.post("/", blacklists.create);
blacklistsRouter.get("/:id", blacklists.getOne);
blacklistsRouter.get("/", blacklists.getAll);
blacklistsRouter.put("/:id", blacklists.update);
blacklistsRouter.delete("/:id", blacklists.delete);

module.exports = { blacklistsRouter };
