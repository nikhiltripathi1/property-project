const Property = require("../models/property");

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
  Property.find({ is_deleted: { $ne: true } })
    .then((prop) => res.json(prop))
    .catch((err) => res.sendStatus(500));
};

exports.searchProperty = (req, res) => {
  Property.find({
    $or: [
      {
        property_name: {
          $regex: req.params.query,
          $options: "i",
        },
      },
      {
        property_location: {
          $regex: req.params.query,
          $options: "i",
        },
      },
    ],
  })
    .then((prop) => res.json(prop))
    .catch((err) => res.sendStatus(500));
};
