/**
 * @class Response
 */
class Response {
  /**
   * @static
   * @param {*} res
   * @param {*} code
   * @param {*} message
   * @returns {object} object
   * @memberof Response
   */
  static error(res, code, payload, message = "Unsuccessful operation") {
    return res.status(code).json({
      hasError: "true",
      message,
      payload,
    });
  }

  /**
   * @static
   * @param {*} res
   * @param {*} code
   * @param {*} payload
   * @param {*} message
   * @returns {object} object
   * @memberof Response
   */
  static success(res, code, message = "Successful operation", payload={}) {
    return res.status(code).json({
      hasError: "false",
      message,
      payload
    });
  }
}

module.exports = { Response };
