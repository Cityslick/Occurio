const express = require("express");
const collaboratorRoutes = express.Router();
const collaboratorController = require("../controllers/collaboratorController");

collaboratorRoutes.post("/", collaboratorController.assignCollaborators);
collaboratorRoutes.get("/:proj_id", collaboratorController.findCollaboratorProjects);
collaboratorRoutes.post("/:proj_id", collaboratorController.deleteCollaborators);


module.exports = collaboratorRoutes;
