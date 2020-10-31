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

/* Node 8 is deprecated
* Starting Feb 15, 2021, we'll no longer support new deploys or updates of Node.js 8 functions.
* Starting Mar 15, 2021, we'll no longer support executions of existing Node.js 8 functions.
*/
exports.app = functions.https.onRequest(index);
