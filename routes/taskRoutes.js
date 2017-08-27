const express= require("express");
const taskRoutes= express.Router();
const taskController= require("../controllers/taskController");


taskRoutes.post("/",taskController.assignTasks )
taskRoutes.put("/:task_id",taskController.updateTasks )
taskRoutes.get("/:task_id",taskController.findById )
taskRoutes.delete("/:task_id",taskController.deleteTask);
taskRoutes.post("/:proj_id",taskController.findProjectTasks);
taskRoutes.post("/user/:user_id",taskController.findCollaboratorsTasks);


module.exports= taskRoutes;
