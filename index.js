import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import cors from "cors";
import dbConnection from "./configs/dbConnection.js";
import userRouter from "./routes/UserRouter.js";
import postRouter from "./routes/PostRouter.js";
import friendRouter from "./routes/FriendRouter.js";
import authRouter from "./routes/AuthRoute.js";
import filesRouter from "./routes/FileRouter.js";
import passConfig from "./configs/AuthConfig.js";
import { corsOptions, credentials } from "./configs/corsOptions.js";

import basicSetup from "./setup.js";

const app = express();

dotenv.config();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());

const port = process.env.port || 3500;

passConfig(passport);

//DEV
//TEST for adding interceptor for static folder
const fileFolder = express.static("public/data/uploads");
app.use("/media", (req, res, next) => {
  console.log("someone requested photo out");
  const reqNotify = () => {
    console.log("someone requested photo");
  };

  req.on("end", reqNotify);

  fileFolder(req, res, (error) => {
    req.off("end", reqNotify);
    next(error);
  });
});

app.use("/auth/", authRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/friend", friendRouter);
app.use("/file", filesRouter);
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to gym social media api" });
});

app.get("*", (req, res) => {
  res.status(404).json({ success: false, reason: "Page not found" });
});

dbConnection
  .authenticate()
  .then(() => {
    console.log(`DB connection success.`);
  })
  .catch((error) => {
    console.error(`DB connection error. Error: ${error}`);
  });

//uncomment to run basic setup
//TODO:  move it pernamently to setup file
// basicSetup();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
