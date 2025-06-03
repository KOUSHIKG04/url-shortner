import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../dao/user.dao.js";
import { ConflictError } from "../utils/errorHandler.js";

export const registerUser = async (name, email, password) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new ConflictError("User already exists");
  }

  const newUser = await createUser(name, email, password);

  const token = newUser.generateJwtToken(newUser);

  return token;
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({
    email,
  }).select("+password");

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = user.generateJwtToken(user);

  return { token, user };
};
