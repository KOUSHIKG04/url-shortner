import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema(
  {
    full_url: {
      type: String,
      required: true,
    },
    short_url: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

shortUrlSchema.index(
  {
    short_url: 1,
  },
  { unique: true }
);

export default mongoose.model("ShortUrl", shortUrlSchema);
