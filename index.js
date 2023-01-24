import express from "express";
import dotenv from "dotenv";

const app = express();

dotenv.config();

const port = process.env.port || 3500;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
