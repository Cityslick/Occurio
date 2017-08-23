const db= require("../db/config");

const task={
  assignTasks: function(task){
    return db.none("INSERT INTO tasks(user_id, proj_id, description, start_date, end_date, status, ticket) VALUES( $1, $2, $3, $4, $5, $6,$7)",
                   [task.user_id, task.proj_id, task.description, task.start_date, task.end_date,
                   task.status, task.ticket])
  },

  updateTasks: function(task){
    return db.none("UPDATE tasks set  user_id=$1, proj_id=$2, description= 3$, start_date= $4, end_date= $5, status= $6, ticket=$7)",
                   [task.user_id, task.proj_id, task.description, task.start_date, task.end_date,
                   task.status, task.ticket])
  },

  deleteTask: function(tasksId){
    return db.none("DELETE FROM tasks WHERE id = $1", [tasksId])
  },

  findProjectTasks :function(projectId){
    return db.query("SELECT * FROM tasks WHERE proj_id = $1", [projectId])
  },

  findCollaboratorsTasks :function(task){
    return db.query("SELECT * FROM tasks WHERE proj_id and user_id = $1 ", [task.proj_id, task.user_id])
  }

}


module.exports = task
