const express = require("express");
const settings = require("../../controllers/settings").SettingsController;

const settingsRouter = express.Router();

settingsRouter.post("/", settings.create);
settingsRouter.get("/:id", settings.getOne);
settingsRouter.get("/", settings.getAll);
settingsRouter.put("/:id", settings.update);
settingsRouter.delete("/:id", settings.delete);

module.exports = { settingsRouter };
