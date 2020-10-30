const admin = require("firebase-admin");
const db = admin.firestore();
const response = require("./helper").Response;

/**
 * Settings Controller
 * @async
 * @class SettingsController
 */
class SettingsController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof SettingsController
   */
  static async create(req, res) {
    try {
      await db
        .collection("settings")
        .doc("/" + req.body.id + "/")
        .create({
          metaname: req.body.metaname,
          metatype: req.body.metatype,
          metavalue: req.body.metavalue,
        });

      response.success(res, 201, payload);
    } catch (errors) {
      response.error(res, 400);
    }
  }
}

module.exports = { SettingsController };
