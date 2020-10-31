const functions = require("firebase-functions");
const cors = require("cors");
const { config } = require("dotenv");
const apis = require("./routes/api");
const express = require("express");

config();

const index = express();
const port = process.env.PORT || 6700;

const corsOptions = {
  origin: "*",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Use the CORS
index.use(cors(corsOptions));

index.use("/api/v1", apis.apiRouter);

index.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

/* Node 8 is deprecated
* Starting Feb 15, 2021, we'll no longer support new deploys or updates of Node.js 8 functions.
* Starting Mar 15, 2021, we'll no longer support executions of existing Node.js 8 functions.
*/
exports.app = functions.https.onRequest(index);
