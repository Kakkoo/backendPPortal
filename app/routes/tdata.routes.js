module.exports = (app) => {
  const tdata = require("../controllers/tdata.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tdata.create);

  // Retrieve all Tutorials
  router.get("/", tdata.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", tdata.findOne);

  router.get("/meetingname/:meetingId", tdata.meetingname);

  router.get("/getdata/:name", tdata.getdata);

  router.get(
    "/getMeetingNamedata/:MeetingName/:Name",
    tdata.getMeetingNamedata
  );

  // Update a Tutorial with id
  router.put("/:id", tdata.update);

  // Delete a Tutorial with id
  router.delete("/:id", tdata.delete);

  // Create a new Tutorial
  router.delete("/", tdata.deleteAll);

  app.use("/api/tdatas", router);
};
