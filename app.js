// entry point
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// eslint-disable-next-line import/no-extraneous-dependencies
const dotenv = require("dotenv");
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
// The middleware with the hard-coded ID should be removed. It will not be used at this stage. - Aisalkyn Dzhenalieva
// app.use((req, res, next) => {
//   req.user = {
//     _id: "6837c5ef4cce6ac02603731b",
//   };
//   next();
// });
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});
app.use("/", router);

app.use((err, req, res) => {
  console.error(err);
  res.send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
