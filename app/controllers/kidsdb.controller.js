const db = require("../models");
const kidsdb = db.kidsdbs;

var _ = require("lodash");


exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Name can not be empty!" });
    return;
  }

  // Create a Tutorial
  const kidsDB = new kidsdb({

    name: req.body.name,
    chores: req.body.chores,
    amount: req.body.amount,
    done: req.body.done

  });

  // Save Tutorial in the database
  kidsDB
    .save(kidsDB)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};


exports.findAll = (req, res) => {
  const title = req.query.title;


  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};


  kidsdb.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};




exports.findOne = (req, res) => {
  const name = req.params.id;

  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  kidsdb.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};



exports.sumbyname = (req, res) => {
  const name = req.params.name;

  //var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  // kidsdb.find(condition)
  kidsdb.find({ name: name, done: "Yes" })
    .then(data => {
      kidsdata = data;
      var KidsSum = 0;

      kidsdata.forEach(item => {
        KidsSum = item.amount + KidsSum;
      })
      res.send({ name: name, KidsSum: KidsSum });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });

    });
};

exports.sumchorebyname = (req, res) => {
  const name = req.params.name;
  var chore = kidsdb.find({ name: name, done: "Yes" })
  var sumofchore = { kidsdbs: [], kidname: {} }
  chore.then(data => {
    kidsdata = data;

    kidsdata.forEach(item => {
      var choreObj = {
        chores: item.chores
      }

      sumofchore.kidsdbs.push(choreObj);

    })
    var kidname = { name: name };
    sumofchore.kidname = kidname;
    res.send({ sumofchore });
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });

    });
};
exports.sumbydone = (req, res) => {
  const done = req.params.done;

  var condition = done ? { done: { $regex: new RegExp(done), $options: "i" } } : {};

  // kidsdb.find(condition)
  kidsdb.find({ done: done })
    .then(data => {
      kidsdata = data;
      var allKidsSum = 0;

      kidsdata.forEach(item => {
        allKidsSum = item.amount + allKidsSum;
      })
      res.send({ done: done, allKidsSum: allKidsSum });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });

    });
};

exports.balance = (req, res) => {
  const done = req.params.done;

  var condition = done ? { done: { $regex: new RegExp(done), $options: "i" } } : {};

  // kidsdb.find(condition)
  kidsdb.find({ done: done })
    .then(data => {
      kidsdata = data;
      var balance;
      var allKidsSum = 0;

      kidsdata.forEach(item => {
        (balance = 150 - (allKidsSum = item.amount + allKidsSum));
      })
      res.send({ done: done, balance: balance });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });

    });
};
exports.findChores = (req, res) => {
  const name = req.params.id;

  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  var mysort = { chores: -1 };

  kidsdb.find(condition).sort(mysort)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};




exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  kidsdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  kidsdb.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  kidsdb.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};