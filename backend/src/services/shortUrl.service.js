import { saveShortUrl } from "../dao/shortUrl.js";
import { generateNanoId } from "../utils/helper.js";

export const shortUrlService = async (url) => {
  const shortUrl = generateNanoId(8);
  await saveShortUrl(shortUrl, url);
  return shortUrl;
};

export const shortUrlServiceWithUser = async (url, userId) => {
  const shortUrl = generateNanoId(8);
  await saveShortUrl(shortUrl, url, userId);
  return shortUrl;
};
