import express from "express";

const app = express();
const port = 4001;

app.get("/", (req, res) => {
  res.send(`Let's make it happen together`);
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
