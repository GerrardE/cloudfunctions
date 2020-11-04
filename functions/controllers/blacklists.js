const response = require("./helper").Response;
const FieldValue = require("firebase-admin").firestore.FieldValue;
const db = require("./config").db;

/**
 * Blacklists Controller
 * @async
 * @class BlacklistsController
 */

class BlacklistsController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof BlacklistsController
   */
  static async create(req, res) {
    try {
      await db.collection(BlacklistsController.parameters).add({
        entitytype: req.body.entitytype,
        entity: req.body.entity,
        createdat: FieldValue.serverTimestamp(),
        updatedat: FieldValue.serverTimestamp(),
      });

      response.success(
        res,
        201,
        `${BlacklistsController.parameter} created successfully`,
        {}
      );
    } catch (errors) {
      response.error(
        res,
        500,
        `${BlacklistsController.parameters} could not be created`,
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
   * @memberof BlacklistsController
   */
  static async update(req, res) {
    try {
      const document = await db.collection(BlacklistsController.parameters).doc(req.params.id);

      await document.update({
        entitytype: req.body.entitytype,
        entity: req.body.entity,
        updatedat: FieldValue.serverTimestamp(),
      })

      response.success(
        res,
        201,
        `${BlacklistsController.parameter} updated successfully`,
        {}
      );
    } catch (errors) {
      response.error(
        res,
        500,
        `${BlacklistsController.parameters} could not be updated`,
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
   * @memberof BlacklistsController
   */
  static async getOne(req, res) {
    try {
      const document = await db
        .collection(BlacklistsController.parameters)
        .doc(req.params.id);
      const resp = await document.get();
      const payload = resp.data();

      response.success(
        res,
        200,
        `${BlacklistsController.parameter} retrieved successfully`,
        payload
      );
    } catch (error) {
      response.error(
        res,
        500,
        `${BlacklistsController.parameter} could not be retrieved`,
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
   * @memberof BlacklistsController
   */
  static async delete(req, res) {
    try {
      const document = await db
        .collection(BlacklistsController.parameters)
        .doc(req.params.id);
      await document.delete();

      response.success(
        res,
        200,
        `${BlacklistsController.parameter} deleted successfully`,
        {}
      );
    } catch (error) {
      response.error(
        res,
        500,
        `${BlacklistsController.parameter} could not be deleted`,
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
   * @memberof BlacklistsController
   */
  static async getAll(req, res) {
    try {
      const document = await db.collection(BlacklistsController.parameters);
      const payload = [];

      await document.get().then((querySnapshot) => {
        let docs = querySnapshot.docs;
        for (let doc of docs) {
          const selectedItem = {
            id: doc.id,
            entitytype: doc.data().entitytype,
            entity: doc.data().entity,
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
        `${BlacklistsController.parameters} retrieved successfully`,
        payload
      );
    } catch (error) {
      response.error(
        res,
        500,
        `${BlacklistsController.parameters} could not be retrieved`,
        error
      );
    }
  }
}
BlacklistsController.parameters = "blacklists";
BlacklistsController.parameter = "blacklist";

module.exports = { BlacklistsController };
