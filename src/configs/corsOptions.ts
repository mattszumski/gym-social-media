import { CorsOptions } from "cors";
import { NextFunction, Request, Response } from "express";

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001", "http://localhost:5173"];

export const credentials = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin || "";
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", "true");
  }
  next();
};

export const corsOptions: CorsOptions = {
  origin: (origin = "", callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error(`Origin: ${origin} is not allowed by CORS`));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};
