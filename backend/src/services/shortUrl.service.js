import { getCustomShortUrl, saveShortUrl } from "../dao/shortUrl.js";
import { generateNanoId } from "../utils/helper.js";

export const shortUrlService = async (url) => {
  const shortUrl = generateNanoId(8);
  await saveShortUrl(shortUrl, url);
  return shortUrl;
};

export const shortUrlServiceWithUser = async (url, userId, slug = null) => {
  const shortUrl = slug || generateNanoId(8);
  if (slug) {
    const existingUrls = await getCustomShortUrl(slug);
    if (existingUrls && existingUrls.length > 0) {
      throw new Error("This custom url already exists");
    }
  }
  await saveShortUrl(shortUrl, url, userId);
  return shortUrl;
};
