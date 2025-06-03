import { attachUser } from "./src/utils/attachUser.js";
import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./src/utils/errorHandler.js";

const application = express();

application.use(express.json());
application.use(cors());
application.use(cookieParser());
application.use(
  express.urlencoded({
    extended: true,
  })
);
application.use(attachUser);
application.use(errorHandler);

import shortUrlRoute from "./src/routes/shortUrl.route.js";
import authRoute from "./src/routes/auth.route.js";
application.use("/api/v1/create", shortUrlRoute); application.use("/api/v1/auth", authRoute);

application.get("/", (req, res) => {
  res.send("urlshortner application running in background!!");
});

export default application;
