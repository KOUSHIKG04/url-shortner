import { findUrlfromShortUrl } from "../dao/shortUrl.js";
import {
  shortUrlService,
  shortUrlServiceWithUser,
} from "../services/shortUrl.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const createShortUrl = wrapAsync(async (req, res) => {
  const { url, slug } = req.body;

  let shortUrl;

  if (req.user) {
    shortUrl = await shortUrlServiceWithUser(url, req.user.id, slug);
  } else {
    shortUrl = await shortUrlService(url);
  }

  res.json({
    success: true,
    ShortUrl: `${process.env.BASE_URL}/api/v1/create/${shortUrl}`,
  });
});

export const redirectShortUrl = wrapAsync(async (req, res) => {
  const { id } = req.params;

  const url = await findUrlfromShortUrl(id);

  if (!url) throw new Error("Short URL not found");

  res.redirect(url.full_url);
});
