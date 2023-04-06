import { pbkdf2Sync, randomBytes } from "crypto";
import { Request } from "express";
import jwt from "jsonwebtoken";
import UserAuthData from "./types/UserAuthData";

export const validatePassword = (password: string, hash: string, salt: string) => {
  const hashedPassword = pbkdf2Sync(password, salt, 32000, 64, "sha512").toString("hex");
  return hashedPassword === hash;
};

export const hashPassword = (password: string) => {
  const salt = randomBytes(64).toString("hex");
  const hashedPassword = pbkdf2Sync(password, salt, 32000, 64, "sha512").toString("hex");

  return { salt, hashedPassword };
};

export const signJWT = (userData: UserAuthData) => {
  //Random number added to distinguish the tokens send in the same second (failing tests)
  const payload = {
    userId: userData.userId,
    username: userData.username,
    rand: Math.round(Math.random() * 10000),
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, options);
};

export const getBearerTokenFromReq = (req: Request) => {
  let tokenFromHeader = req.headers?.authorization;
  return tokenFromHeader && tokenFromHeader.split(" ").at(1);
};
