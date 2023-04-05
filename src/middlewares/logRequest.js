import logger from "../utils/RequestLogger.js";

const logReqest = (req, res, next) => {
  req.met;
  const { host, origin } = req.headers;
  const originalUrl = req.originalUrl;
  const method = req.method;
  logger.emit("logIncoming", { host, origin, originalUrl, method });
  next();
};

export default logReqest;
