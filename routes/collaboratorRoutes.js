const express = require("express");
const collaboratorRoutes = express.Router();
const collaboratorController = require("../controllers/collaboratorController");

collaboratorRoutes.post("/", collaboratorController.assignCollaborators);
collaboratorRoutes.get("/:proj_id", collaboratorController.findCollaboratorProjects);
collaboratorRoutes.delete("/", collaboratorController.deleteCollaborators);


module.exports = collaboratorRoutes;
