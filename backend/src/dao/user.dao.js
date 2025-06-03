import User from "../model/user.model.js";

export const findUserByEmail = async (email) => {
  try {
    return await User.findOne({
      email,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const findUserById = async (id) => {
  try {
    return await User.findById({
      id,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const createUser = async (name, email, password) => {
  try {
    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    return newUser;
  } catch (err) {
    throw new Error(err.message);
  }
};
