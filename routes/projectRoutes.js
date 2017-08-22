const express = require("express");
const projectRoutes = express.Router();
const projectsController = require("../controllers/projectController");

projectRoutes.post("/", projectsController.create);
projectRoutes.get("/", projectsController.findAll);
projectRoutes.get("/:id", projectsController.findById);
projectRoutes.delete("/:id", projectsController.delete);



module.exports = projectRoutes;
