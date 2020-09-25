module.exports = (app) => {
  const tdname = require("../controllers/tdname.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tdname.create);

  // Retrieve all Tutorials
  router.get("/", tdname.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", tdname.findOne);

  // Delete a Tutorial with id
  router.delete("/:id", tdname.delete);

  router.delete("/findOnendelete/:id", tdname.findOnendelete);

  // Create a new Tutorial
  router.delete("/", tdname.deleteAll);

  app.use("/api/tdnames", router);
};
