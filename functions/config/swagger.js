const swaggerJsdoc = require("swagger-jsdoc");
const { config } = require("dotenv");

config();

// deine host url
const host = process.env.HOST_NAME || "localhost:5000";

// Swagger Definitions
const swaggerDefinition = {
  info: {
    title: "cloudfunctions",
    version: "1.0.0",
    description: "cloudfunctions is a simple api for firebase cloud functions.",
  },
  host,
  basePath: "/api/v1",
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ["/swagger.yaml"],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
