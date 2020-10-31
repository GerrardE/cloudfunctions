const functions = require("firebase-functions");
const cors = require("cors");
const debug = require("debug");
const { config } = require("dotenv");
const logger = require("morgan");
const swaggerUi = require("swagger-ui-express");
const apis = require("./routes/api");
const swaggerSpec = require("./config/swagger");
const express = require("express");

const debugged = debug("index");
config();

const index = express();
const port = process.env.PORT || 4000;

const corsOptions = {
  origin: "*",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Use the CORS
index.use(cors(corsOptions));

index.use(logger("dev"));

index.use("/api/v1", apis.apiRouter);

// swagger-ui-express for API endpoint documentation
index.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

index.listen(port, () => {
  debugged(`Listening on port ${port}`);
});

exports.app = functions.https.onRequest(index);
