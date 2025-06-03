export const cookieOption = {
  maxAge: 1000 * 60 * 5,
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  //   sameSite: "strict",
};
