const db = require("../models");
const tdname = db.tdnames;

var _ = require("lodash");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "name can not be empty!" });
    return;
  }

  // Create a Tutorial
  const tDATA = new tdname({
    name: req.body.name,
    age: req.body.age,
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

  tdname
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

  tdname
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
exports.findOnendelete = (req, res) => {
  const name = req.params.id;

  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  tdname
    .find(condition)
    .then((data) => {
      var Id = data[0].id;
      tdname.findByIdAndRemove(Id).then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Tutorial with id=${Id}. Maybe Tutorial was not found!`,
          });
        } else {
          res.send({
            message: "Tutorial was deleted successfully!",
          });
        }
      });
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

  tdname
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
  tdname
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
