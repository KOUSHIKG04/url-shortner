import express from "express";
import {
  createShortUrl,
  redirectShortUrl,
} from "../controller/shortUrl.controller.js";

const router = express.Router();

router.post("/create-short-url", createShortUrl); router.get("/:id", redirectShortUrl); 

export default router;
