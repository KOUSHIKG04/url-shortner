import express from "express";
import "dotenv/config";
import cors from "cors";
import { errorHandler } from "./src/utils/errorHandler.js";

const application = express();

application.use(express.json());
application.use(cors());
application.use(
  express.urlencoded({
    extended: true,
  })
);
application.use(errorHandler)

import shortUrlRoute from "./src/routes/shortUrl.route.js";
application.use("/api/v1", shortUrlRoute);

application.get("/", (req, res) => {
  res.send("urlshortner application running in background!!");
});

export default application;
