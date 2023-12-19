const router = require("express").Router();
require("dotenv").config();
const { createError } = require("../Service/Error");
const { AJOUTER_USER } = require("../authcontrollers/_user");

// ADD USER
router.post("/AJOUTER", AJOUTER_USER);

module.exports = router;
