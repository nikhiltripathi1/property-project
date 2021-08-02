const Appointments = require("../models/appointments");

exports.bookAppointment = (req, res) => {
  const newAppointment = new Appointments({
    property_id: req.body.property_id,
    user_id: req.user.user.id,
    date: req.body.date,
    time: req.body.time,
  });
  newAppointment
    .save()
    .then((appointment) => {
      res.json({ msg: "Appointment Booked" });
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log(err);
    });
};
