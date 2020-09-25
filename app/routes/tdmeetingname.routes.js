module.exports = (app) => {
  const tdmeetingname = require("../controllers/tdmeetingname.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tdmeetingname.create);

  // Retrieve all Tutorials
  router.get("/", tdmeetingname.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", tdmeetingname.findOne);

  // Delete a Tutorial with id
  router.delete("/:id", tdmeetingname.delete);

  router.delete("/findOnendelete/:id", tdmeetingname.findOnendelete);

  // Create a new Tutorial
  router.delete("/", tdmeetingname.deleteAll);

  app.use("/api/tdmeetingnames", router);
};
