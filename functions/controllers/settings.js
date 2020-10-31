const admin = require("firebase-admin");
const response = require("./helper").Response;
const serviceAccount = require("../permissions.json");
const FieldValue = require("firebase-admin").firestore.FieldValue;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sensei-edfdf.firebaseio.com",
});

const db = admin.firestore();

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
      await db.collection(SettingsController.parameters).add({
        metatype: req.body.metatype,
        metakey: req.body.metakey,
        metavalue: req.body.metavalue,
        createdat: FieldValue.serverTimestamp(),
        updatedat: FieldValue.serverTimestamp(),
      });

      response.success(
        res,
        201,
        `${SettingsController.parameter} created successfully`,
        {}
      );
    } catch (errors) {
      response.error(
        res,
        500,
        `${SettingsController.parameters} could not be created`,
        errors
      );
    }
  }

  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof SettingsController
   */
  static async update(req, res) {
    try {
      const document = await db.collection(SettingsController.parameters).doc(req.params.id);

      await document.update({
        metatype: req.body.metatype,
        metakey: req.body.metakey,
        metavalue: req.body.metavalue,
        updatedat: FieldValue.serverTimestamp(),
      })

      response.success(
        res,
        201,
        `${SettingsController.parameter} updated successfully`,
        {}
      );
    } catch (errors) {
      response.error(
        res,
        500,
        `${SettingsController.parameters} could not be updated`,
        errors
      );
    }
  }

  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof SettingsController
   */
  static async getOne(req, res) {
    try {
      const document = await db
        .collection(SettingsController.parameters)
        .doc(req.params.id);
      const resp = await document.get();
      const payload = resp.data();

      response.success(
        res,
        200,
        `${SettingsController.parameter} retrieved successfully`,
        payload
      );
    } catch (error) {
      response.error(
        res,
        500,
        `${SettingsController.parameter} could not be retrieved`,
        error
      );
    }
  }

  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof SettingsController
   */
  static async delete(req, res) {
    try {
      const document = await db
        .collection(SettingsController.parameters)
        .doc(req.params.id);
      await document.delete();

      response.success(
        res,
        200,
        `${SettingsController.parameter} deleted successfully`,
        {}
      );
    } catch (error) {
      response.error(
        res,
        500,
        `${SettingsController.parameter} could not be deleted`,
        error
      );
    }
  }

  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof SettingsController
   */
  static async getAll(req, res) {
    try {
      const document = await db.collection(SettingsController.parameters);
      const payload = [];

      await document.get().then((querySnapshot) => {
        let docs = querySnapshot.docs;
        for (let doc of docs) {
          const selectedItem = {
            id: doc.id,
            metatype: doc.data().metatype,
            metakey: doc.data().metakey,
            metavalue: doc.data().metavalue,
            createdat: doc.data().createdat,
            updatedat: doc.data().updatedat,
          };

          payload.push(selectedItem);
        }

        return payload;
      });

      response.success(
        res,
        200,
        `${SettingsController.parameters} retrieved successfully`,
        payload
      );
    } catch (error) {
      response.error(
        res,
        500,
        `${SettingsController.parameters} could not be retrieved`,
        error
      );
    }
  }
}
SettingsController.parameters = "settings";
SettingsController.parameter = "setting";

module.exports = { SettingsController };
