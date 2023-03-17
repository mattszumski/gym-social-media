import logger from "../utils/RequestLogger.js";

const logReqest = (req, res, next) => {
  const { host, origin } = req.headers;
  const originalUrl = req.originalUrl;
  logger.emit("logIncoming", { host, origin, originalUrl });
  next();
};

export default logReqest;
