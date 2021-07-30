const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const { saveProperty, getProperties } = require("../controllers/property");

router.post("/", saveProperty);

router.get("/", getProperties);
module.exports = router;
