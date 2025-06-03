import { cookieOption } from "../config/cookieOption.js";
import { loginUser, registerUser } from "../services/auth.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const register = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;

  const token = await registerUser(name, email, password);

  res.cookie("accesstoken", token, cookieOption);

  res.json({
    success: true,
    token,
  });
});

export const login = wrapAsync(async (req, res) => {
  const { email, password } = req.body;

  const { token, user } = await loginUser(email, password);

  res.cookie("accesstoken", token, cookieOption);

  res.json({
    success: true,
    user,
    token,
  });
});
