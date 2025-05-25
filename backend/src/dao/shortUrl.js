import shortUrlModel from "../model/shortUrl.model.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
  try {
    const newUrl = new shortUrlModel({
      full_url: longUrl,
      short_url: shortUrl,
    });

    if (userId) {
      newUrl.user_id = userId;
    }

    await newUrl.save();
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Short URL already Exists");
    }
    throw new Error(error.message);
  }
};

export const findUrlfromShortUrl = async (shortUrl) => {
  try {
    return await shortUrlModel.findOneAndUpdate(
      {
        short_url: shortUrl,
      },
      {
        $inc: { clicks: 1 },
      }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};
