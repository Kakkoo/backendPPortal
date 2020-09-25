module.exports = (app) => {
    const tdfiller = require("../controllers/tdfiller.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", tdfiller.create);
  
    // Retrieve all Tutorials
    router.get("/", tdfiller.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", tdfiller.findOne);

    // Delete a Tutorial with id
    router.delete("/:id", tdfiller.delete);
  
    // Create a new Tutorial
    router.delete("/", tdfiller.deleteAll);
  
    app.use("/api/tdfillers", router);
  };
  