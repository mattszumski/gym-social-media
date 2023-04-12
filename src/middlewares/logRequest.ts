import logger from "../utils/RequestLogger.js";
import { Request, Response, NextFunction } from "express";

const logReqest = (req: Request, res: Response, next: NextFunction) => {
  const { host, origin } = req.headers;
  const originalUrl = req.originalUrl;
  const method = req.method;
  logger.emit("logIncoming", { host, origin, originalUrl, method });
  next();
};

export default logReqest;
