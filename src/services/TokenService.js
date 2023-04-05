import TokenBlacklist from "../models/TokenBlacklist.js";

export const addToBlacklist = (token) => {
  TokenBlacklist.create({ token });
};

export const checkIfTokenOnBlacklist = async (token) => {
  const result = await TokenBlacklist.findOne({ where: { token } });
  if (result) {
    return true;
  }
  return false;
};
