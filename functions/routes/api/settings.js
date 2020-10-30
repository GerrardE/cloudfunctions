const express = require("express");
const settings = require("../../controllers/settings").SettingsController;

const settingsRouter = express.Router();

settingsRouter.get("/", settings.create);
// settingsRouter.get('/', verifyToken, setting.getAll);
// settingsRouter.get('/:id', verifyToken, settingFinder, setting.getById);
// settingsRouter.get('/:name/setting', verifyToken, confFinder, setting.getByName);
// settingsRouter.put('/:id', verifyToken, settingFinder, trim, setting.update);
// settingsRouter.delete('/:id', verifyToken, settingFinder, setting.delete);

module.exports = { settingsRouter };
