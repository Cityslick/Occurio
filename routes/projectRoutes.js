const express = require("express");
const projectRoutes = express.Router();
const projectsController = require("../controllers/projectController");

projectRoutes.get("/", projectsController.findAll);
projectRoutes.get("/:id",projectsController.findById);



module.exports = projectRoutes;
