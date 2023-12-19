const mongoose = require("mongoose");

const PROJECTSchema = new mongoose.Schema({
  nameProject: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    default: "Backlog",
  },
});

module.exports.PROJECT = mongoose.model("PROJECT", PROJECTSchema);
