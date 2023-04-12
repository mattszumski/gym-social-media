import TokenBlacklist from "../models/TokenBlacklist.js";

export const addToBlacklist = (token: string | undefined) => {
  if (typeof token === "undefined") {
    return;
  }

  TokenBlacklist.create({ token });
};

export const checkIfTokenOnBlacklist = async (token: string | undefined) => {
  if (typeof token === "undefined") {
    throw new Error("No token data");
  }
  const result = await TokenBlacklist.findOne({ where: { token } });
  if (result) {
    return true;
  }
  return false;
};
