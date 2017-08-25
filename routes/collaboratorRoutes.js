const express = require("express");
const collaboratorRoutes = express.Router();
const collaboratorController = require("../controllers/collaboratorController");

collaboratorRoutes.post("/", collaboratorController.assignCollaborators);
collaboratorRoutes.put("/", collaboratorController.loadCollaborators);
collaboratorRoutes.get("/:proj_id", collaboratorController.findCollaboratorProjects);
collaboratorRoutes.post("/:proj_id", collaboratorController.deleteCollaborators);


module.exports = collaboratorRoutes;
