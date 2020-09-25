module.exports = (app) => {
  const namepassworddb = require("../controllers/namepassworddb.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", namepassworddb.create);

  // Retrieve all Tutorials
  router.get("/", namepassworddb.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", namepassworddb.findOne);

  // Update a Tutorial with id
  router.put("/:id", namepassworddb.update);

  // Delete a Tutorial with id
  router.delete("/:id", namepassworddb.delete);

  // Create a new Tutorial
  router.delete("/", namepassworddb.deleteAll);

  app.use("/api/namepassworddbs", router);
};
