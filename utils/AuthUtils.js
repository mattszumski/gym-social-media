import { pbkdf2Sync, randomBytes } from "crypto";
import jwt from "jsonwebtoken";

// function to create JWT token
// function to

export const validatePassword = (password, hash, salt) => {
  const hashedPassword = pbkdf2Sync(password, salt, 32000, 64, "sha512").toString("hex");
  return hashedPassword === hash;
};

export const hashPassword = (password) => {
  const salt = randomBytes(64).toString("hex");
  const hashedPassword = pbkdf2Sync(password, salt, 32000, 64, "sha512").toString("hex");

  return { salt, hashedPassword };
};

export const signJWT = (userData) => {
  const payload = {
    userId: userData.userId,
    username: userData.username,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options);
};
