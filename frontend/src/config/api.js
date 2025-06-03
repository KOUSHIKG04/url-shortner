import axiosInstance from "./axiosInstance";

export const createShortUrl = async (url) => {
  const response = await axiosInstance.post(
    "/api/v1/create/short-url", {
    url,
  });
  return response.data.ShortUrl;
};
