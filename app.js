// entry point
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

// connecting to Mongo DB Server
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "6837c5ef4cce6ac02603731b",
  };
  next();
});
app.use("/", router);

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
