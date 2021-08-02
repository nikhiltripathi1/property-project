const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const {
  saveProperty,
  getProperties,
  searchProperty,
  getSavedProperties,
  getAppointments,
  bookAppointment,
} = require("../controllers/property");

router.post("/", saveProperty);

router.get("/", auth, getProperties);

router.get("/myfavourite", auth, getSavedProperties);

router.get("/myappointments", auth, getAppointments);

router.post("/bookappointment", auth, bookAppointment);

router.get("/search/:query", auth, searchProperty);

module.exports = router;
