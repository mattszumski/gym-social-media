import express from "express";
import dotenv from "dotenv";
import dbConnection from "./configs/dbConnection.js";
import { setupDb } from "./services/dbService.js";
import userRouter from "./routes/UserRouter.js";
import postRouter from "./routes/PostRouter.js";
import friendRouter from "./routes/FriendRouter.js";

const app = express();

dotenv.config();

app.use(express.json());

const port = process.env.port || 3500;

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/friend", friendRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
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
