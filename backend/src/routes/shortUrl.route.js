import express from "express";
import {
  createShortUrl,
  redirectShortUrl,
} from "../controller/shortUrl.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/short-url", createShortUrl); router.get("/:id", redirectShortUrl);

export default router;
