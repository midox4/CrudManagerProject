const mongoose = require("mongoose");

const UTILISATEURSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: false,
  },

  Email: {
    type: String,
    required: true,
    unique: true,
  },

  Password: {
    type: String,
    required: true,
  },

  Confirm: {
    type: String,
    required: true,
  },
});

module.exports.UTILISATEUR = mongoose.model("UTILISATEUR", UTILISATEURSchema);
