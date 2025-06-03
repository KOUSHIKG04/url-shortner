import User from "../model/user.model.js";

export const attachUser = async (req, res, next) => {
  const token = req.cookies.token || req.cookies.accesstoken;

  if (!token) {
    // console.log("No token found in cookies");
    return next();
  }

  try {
    const decoded = User.verifyJwtToken(token);

    if (!decoded.id) {
      console.log("No user ID in token");
      return next();
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      // console.log("User not found with ID:", decoded.id);
      return next();
    }

    // console.log("User attached to request:", user._id);
    req.user = user;
    next();
  } catch (error) {
    console.error("Error attaching user:", error.message);
    next();
  }
};
