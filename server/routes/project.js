const router = require("express").Router();
require("dotenv").config();
const { createError } = require("../Service/Error");
const {
  PROJECT_ADD,
  PROJECT_GET,
  PROJECT_UPDATE,
  PROJECT_UPDATE_COMPLETED,
  PROJECT_DELETE,
} = require("../authcontrollers/project");

router.post("/ADD", PROJECT_ADD);

router.put("/UPDATE/:id", PROJECT_UPDATE);

router.put("/UPDATE/COMPLETED/:id", PROJECT_UPDATE_COMPLETED);

router.delete("/DELETE/:id", PROJECT_DELETE);

router.get("/GET", PROJECT_GET);

module.exports = router;
