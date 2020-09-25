const db = require("../models");
const namepassworddb = db.namepassworddbs;

var _ = require("lodash");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "name can not be empty!" });
    return;
  }

  // Create a Tutorial
  const namepasswordDB = new namepassworddb({
    name: req.body.name,
    password: req.body.password,
  });

  // Save Tutorial in the database
  namepasswordDB
    .save(namepasswordDB)
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

  namepassworddb
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
  const name = req.params.id;

  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  namepassworddb
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

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const name = req.params.id;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  namepassworddb
    .find(condition)
    .then((data) => {
      namepassworddb
        .findByIdAndUpdate(data[0]._id, req.body, { useFindAndModify: false })
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Tutorial with id=${data[0]._id}. Maybe Tutorial was not found!`,
            });
          } else res.send({ message: "Tutorial was updated successfully." });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating Tutorial with id=" + data[0]._id,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  namepassworddb
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
  namepassworddb
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
