module.exports = app => {
    const persons = require("../controllers/persons.controller.js");
  
    var router = require("express").Router();
    router.post("/", persons.create);
    router.get("/", persons.findAll);
    router.get("/:id", persons.findOne);
    router.put("/:id", persons.update);
    router.delete("/:id", persons.delete);
    router.delete("/", persons.deleteAll);
    app.use('/api/persons', router);
};