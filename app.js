const dotenv = require("dotenv");

const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const cors = require("cors");
const router = require("./routes/index");

dotenv.config();
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
app.use(cors());

// Set up server crash testing Aug16 2025
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});
app.use("/", router);

app.use(errors());

app.use((err, req, res) => {
  const error = err;
  error.message = error.message || "Internal server error";
  error.statusCode = error.statusCode || 500;
  console.error(err);
  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
