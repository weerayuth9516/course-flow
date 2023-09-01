import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRouter from "./apps/userRouter.js";
import dotenv from "dotenv";
async function init() {
  const app = express();
  const port = 4001;
  dotenv.config();
  app.use(cors());
  app.use(bodyParser.json());
  app.use("/users", userRouter);

  app.get("/", (req, res) => {
    return res.send("Course Flow API Running.");
  });
  app.get("*", (req, res) => {
    return res.status(404).send("API Not found.");
  });
  app.listen(port, () => {
    console.log(`Course Flow API Server is running at ${port}`);
  });
}

init();
