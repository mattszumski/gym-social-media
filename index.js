import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import cors from "cors";
import dbConnection from "./configs/dbConnection.js";
import { setupDb } from "./services/dbService.js";
import userRouter from "./routes/UserRouter.js";
import postRouter from "./routes/PostRouter.js";
import friendRouter from "./routes/FriendRouter.js";
import authRouter from "./routes/AuthRoute.js";
import passConfig from "./configs/AuthConfig.js";
import { corsOptions, credentials } from "./configs/corsOptions.js";

const app = express();

dotenv.config();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());

const port = process.env.port || 3500;

passConfig(passport);

app.use("/auth/", authRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/friend", friendRouter);
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

//dev function for rebuilding (force sync) db after changes
// setupDb();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
