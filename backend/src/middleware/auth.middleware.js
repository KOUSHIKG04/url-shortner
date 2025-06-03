import User from "../model/user.model.js";
import { AppError } from "../utils/errorHandler.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const authenticate = wrapAsync(async (req, res, next) => {
  
  const token = req.cookies.accesstoken;

  if (!token) {
    throw new AppError("Authentication required", 401);
  }

  try {
    const decoded = User.verifyJwtToken(token);

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new AppError("Unauthorized", 401);
    }

    req.user = user;
    next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
});
