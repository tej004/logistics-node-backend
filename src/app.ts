import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 3000, () => {
  return console.log(
    `Express is listening at http://localhost:${process.env.PORT || 3000}`
  );
});
