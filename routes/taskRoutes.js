const express= require("express");
const taskRoutes= express.Router();
const taskController= require("../controllers/taskController");


taskRoutes.post("/",taskController.assignTasks )
taskRoutes.delete("/:task_id",taskController.deleteTask);
taskRoutes.put("/:task_id",taskController.updateTasks )
taskRoutes.get("/:proj_id",taskController.findProjectTasks);
taskRoutes.get("/user/:user_id",taskController.findProjectTasks);


module.exports= taskRoutes;
