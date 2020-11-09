const response = require("./helper").Response;
const db = require("./config").db;

/**
 * Users Controller
 * @async
 * @class UsersController
 */

class UsersController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof UsersController
   */
  static async create(req, res) {
    try {
      await db.collection(UsersController.parameters).add({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        socialAuth: req.body.socialAuth,
        createdat: Date.now(),
        updatedat: Date.now(),
      });

      response.success(
        res,
        201,
        `${UsersController.parameter} created successfully`,
        {}
      );
    } catch (errors) {
      response.error(
        res,
        500,
        `${UsersController.parameters} could not be created`,
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
   * @memberof UsersController
   */
  static async update(req, res) {
    try {
      const document = await db.collection(UsersController.parameters).doc(req.params.id);

      await document.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        socialAuth: req.body.socialAuth,
        updatedat: Date.now(),
      })

      response.success(
        res,
        201,
        `${UsersController.parameter} updated successfully`,
        {}
      );
    } catch (errors) {
      response.error(
        res,
        500,
        `${UsersController.parameters} could not be updated`,
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
   * @memberof UsersController
   */
  static async getOne(req, res) {
    try {
      const document = await db
        .collection(UsersController.parameters)
        .doc(req.params.id);
      const resp = await document.get();
      const payload = resp.data();

      response.success(
        res,
        200,
        `${UsersController.parameter} retrieved successfully`,
        payload
      );
    } catch (error) {
      response.error(
        res,
        500,
        `${UsersController.parameter} could not be retrieved`,
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
   * @memberof UsersController
   */
  static async delete(req, res) {
    try {
      const document = await db
        .collection(UsersController.parameters)
        .doc(req.params.id);
      await document.delete();

      response.success(
        res,
        200,
        `${UsersController.parameter} deleted successfully`,
        {}
      );
    } catch (error) {
      response.error(
        res,
        500,
        `${UsersController.parameter} could not be deleted`,
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
   * @memberof UsersController
   */
  static async getAll(req, res) {
    try {
      const document = await db.collection(UsersController.parameters);
      const payload = [];

      await document.get().then((querySnapshot) => {
        let docs = querySnapshot.docs;
        for (let doc of docs) {
          const selectedItem = {
            id: doc.id,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            email: doc.data().email,
            socialAuth: doc.data().socialAuth,
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
        `${UsersController.parameters} retrieved successfully`,
        payload
      );
    } catch (error) {
      response.error(
        res,
        500,
        `${UsersController.parameters} could not be retrieved`,
        error
      );
    }
  }
}
UsersController.parameters = "users";
UsersController.parameter = "user";

module.exports = { UsersController };
