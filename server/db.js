const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.MONGO_URL;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    if (con) {
      console.log("Success MongoDB Connected");
    } else {
      console.log("Error connected MongoDB");
    }
  });
