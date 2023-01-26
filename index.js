import express from "express";
import dotenv from "dotenv";
import dbConnection from "./configs/dbConnection.js";
import { setupDb } from "./services/dbService.js";
import User from "./models/User.js";
import Post from "./models/Post.js";

const app = express();

dotenv.config();

const port = process.env.port || 3500;

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

setupDb();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
