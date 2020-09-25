const db = require("../models");
const tdata = db.tdatas;

var _ = require("lodash");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "name can not be empty!" });
    return;
  }

  // Create a Tutorial
  const tDATA = new tdata({
    name: req.body.name,
    word: req.body.word,
    count: req.body.count,
    meetingId: req.body.meetingId,
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

  tdata
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

  tdata
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
exports.meetingname = (req, res) => {
  const meetingId = req.params.meetingId;

  var condition = meetingId
    ? { meetingId: { $regex: new RegExp(meetingId), $options: "i" } }
    : {};

  tdata
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
exports.getdata = (req, res) => {
  const name = req.params.name;
  tdata
    .find({ name: name, word: "Umm" })
    .then((data) => {
      mdata = data;
      var Umm = 0;

      mdata.forEach((item) => {
        Umm = item.count + Umm;
      });

      tdata.find({ name: name, word: "Hmm" }).then((data) => {
        mmdata = data;
        var Hmm = 0;

        mmdata.forEach((item) => {
          Hmm = item.count + Hmm;
        });
        tdata.find({ name: name, word: "Aaa" }).then((data) => {
          mmmdata = data;
          var Aaa = 0;

          mmmdata.forEach((item) => {
            Aaa = item.count + Aaa;
          });
          tdata.find({ name: name, word: "This" }).then((data) => {
            mmmmdata = data;
            var This = 0;

            mmmmdata.forEach((item) => {
              This = item.count + This;
            });
            tdata.find({ name: name, word: "Somephrase" }).then((data) => {
              mmmmmdata = data;
              var Somephrase = 0;

              mmmmmdata.forEach((item) => {
                Somephrase = item.count + Somephrase;
              });
              tdata.find({ name: name, word: "Otherwords" }).then((data) => {
                mmmmmmdata = data;
                var Otherwords = 0;

                mmmmmmdata.forEach((item) => {
                  Otherwords = item.count + Otherwords;
                });
                res.send({
                  name: name,
                  Umm: Umm,
                  Hmm: Hmm,
                  Aaa: Aaa,
                  This: This,
                  Somephrase: Somephrase,
                  Otherwords: Otherwords,
                });
              });
            });
          });
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
exports.getMeetingNamedata = (req, res) => {
  const name = req.params.Name;
  const meetingId = req.params.MeetingName;
  tdata
    .find({ name: name, meetingId: meetingId, word: "Umm" })
    .then((data) => {
      var Umm = 0;
      data.forEach((item) => {
        Umm = item.count + Umm;
      });
      tdata
        .find({ name: name, meetingId: meetingId, word: "Hmm" })
        .then((data) => {
          var Hmm = 0;
          data.forEach((item) => {
            Hmm = item.count + Hmm;
          });
          tdata
            .find({ name: name, meetingId: meetingId, word: "Aaa" })
            .then((data) => {
              var Aaa = 0;
              data.forEach((item) => {
                Aaa = item.count + Aaa;
              });
              tdata
                .find({ name: name, meetingId: meetingId, word: "This" })
                .then((data) => {
                  var This = 0;
                  data.forEach((item) => {
                    This = item.count + This;
                  });
                  tdata
                    .find({
                      name: name,
                      meetingId: meetingId,
                      word: "Somephrase",
                    })
                    .then((data) => {
                      var Somephrase = 0;
                      data.forEach((item) => {
                        Somephrase = item.count + Somephrase;
                      });
                      tdata
                        .find({
                          name: name,
                          meetingId: meetingId,
                          word: "Otherwords",
                        })
                        .then((data) => {
                          var Otherwords = 0;
                          data.forEach((item) => {
                            Otherwords = item.count + Otherwords;
                          });
                          res.send({
                            meetingId: meetingId,
                            Umm: Umm,
                            Hmm: Hmm,
                            Aaa: Aaa,
                            This: This,
                            Somephrase: Somephrase,
                            Otherwords: Otherwords,
                          });
                        });
                    });
                });
            });
        });
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

  tdata
    .findByIdAndUpdate(name, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  tdata
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
  tdata
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
