const express = require("express");
const parser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
require("./db");

const app = express();

// Cors Policy
const corsOptions = {
  origin: "http://localhost:4000",
  credentials: true,
  optionSuccessStatus: 200,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ROUTES
app.use("/PROJECT", require("./routes/project"));
app.use("/USER", require("./routes/_user"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
