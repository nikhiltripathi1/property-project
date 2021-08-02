const Property = require("../models/property");
const User = require("../models/user");
const Appointments = require("../models/appointments");

exports.saveProperty = (req, res) => {
  const newProperty = new Property({
    title: req.body.title,
    location: req.body.location,
    area_size: req.body.area_size,
    price: req.body.price,
    price_rate: req.body.price_rate,
    property_details: req.body.property_details,
    agent: req.body.agent,
    posted_on: req.body.posted_on,
    contact_no: req.body.contact_no,
    img: req.body.img,
  });
  newProperty
    .save()
    .then((prop) => {
      res.json(prop);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
};
exports.getProperties = (req, res) => {
  console.log(req.user);
  User.find({ _id: req.user.id }, { saved_property: 1 })
    .then((saved_prop) => {
      Property.find().then((prop) => res.json({ prop, saved_prop }));
    })
    .catch((err) => res.sendStatus(500));
};

exports.getSavedProperties = (req, res) => {
  User.find({ _id: req.user.id }, { saved_property: 1 })
    .then((saved_prop) => {
      Property.find({ _id: { $in: saved_prop[0].saved_property } }).then(
        (prop) => res.json(prop)
      );
    })
    .catch((err) => res.sendStatus(500));
};

exports.searchProperty = (req, res) => {
  User.find({ _id: req.user.id }, { saved_property: 1 })
    .then((saved_prop) => {
      Property.find({
        $or: [
          {
            title: {
              $regex: req.params.query,
              $options: "i",
            },
          },
          {
            location: {
              $regex: req.params.query,
              $options: "i",
            },
          },
        ],
      }).then((prop) => res.json({ prop, saved_prop }));
    })
    .catch((err) => res.sendStatus(500));
};

exports.getAppointments = (req, res) => {
  Appointments.find({ user_id: req.user.id })
    .then((appointment) => {
      Property.find().then((prop) => {
        res.json({ appointment, prop });
      });
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log(err);
    });
};

exports.bookAppointment = (req, res) => {
  const newAppointment = new Appointments({
    user_id: req.user.id,
    property_id: req.body.property_id,
    date: req.body.date,
    time: req.body.time,
  });

  newAppointment
    .save()
    .then(() => {
      res.json({ msg: "Appointment Booked" });
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log(err);
    });
};
