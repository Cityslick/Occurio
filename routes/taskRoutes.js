const express= require("express");
const taskRoutes= express.Router();
const taskController= require("../controllers/taskController");


taskRoutes.post("/",taskController.assignTasks )
taskRoutes.put("/:task_id",taskController.updateTasks )
taskRoutes.delete("/:task_id",taskController.deleteTask);
taskRoutes.get("/:proj_id",taskController.findProjectTasks);
taskRoutes.post("/:user_id",taskController.findCollaboratorsTasks);


module.exports= taskRoutes;
