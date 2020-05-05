module.exports = app => {
    const kidsdb = require("../controllers/kidsdb.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", kidsdb.create);
  
    // Retrieve all Tutorials
    router.get("/", kidsdb.findAll);

    // Retrieve sum of all done work 
    router.get("/sumbydone/:done", kidsdb.sumbydone);

     // Retrieve sum of all done work 
     router.get("/balance/:done", kidsdb.balance);
     
     // Retrieve sum of all amount by kid name
    router.get("/sumbyname/:name", kidsdb.sumbyname);
    
     // Retrieve sum of all chore by kid name
     router.get("/sumchorebyname/:name", kidsdb.sumchorebyname);

    // Retrieve all Tutorials
    router.get("/chores", kidsdb.findChores);

    //router.get("/amount/:id", kidsdb.findShreyaAmount);

    // Retrieve a single Tutorial with id
    router.get("/:id", kidsdb.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", kidsdb.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", kidsdb.delete);
  
    // Create a new Tutorial
    router.delete("/", kidsdb.deleteAll);
  
    app.use('/api/kidsdbs', router);
  };