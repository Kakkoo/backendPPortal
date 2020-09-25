const db = require("../models");
const tdfiller = db.tdfillers;

var _ = require("lodash");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.filler) {
    res.status(400).send({ message: "filler can not be empty!" });
    return;
  }

  // Create a Tutorial
  const tDATA = new tdfiller({
    filler: req.body.filler,
    howcommon: req.body.howcommon,
  });
  // Save Tutorial in the database
  tDATA
    .save(tDATA)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  tdfiller
    .find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.findOne = (req, res) => {
  const filler = req.params.id;

  var condition = filler
    ? { filler: { $regex: new RegExp(filler), $options: "i" } }
    : {};

  tdfiller
    .find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  tdfiller
    .findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  tdfiller
    .deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};
