const db= require("../db/config");

const task={
  assignTasks: function(task){
    return db.one("INSERT INTO tasks(user_id, proj_id, name, description, start_date, end_date, status, ticket) VALUES( $1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
                   [task.user_id, task.proj_id, task.name, task.description, task.start_date, task.end_date,
                   task.status, task.ticket])
  },

  updateTasks: function(task,task_id){
    return db.none("UPDATE tasks set  user_id=$1, proj_id=$2, description= $3, start_date= $4, end_date= $5, status= $6, ticket=$7 WHERE id=$8",
                   [task.user_id, task.proj_id, task.description, task.start_date, task.end_date,
                   task.status, task.ticket, task_id])
  },

  deleteTask: function(tasksId){
    return db.none("DELETE FROM tasks WHERE id = $1", [tasksId])
  },

  findProjectTasks :function(task){
      return db.query(" SELECT t.*, to_char(t.start_date,'yyyy-MM-dd') as start_dateStr, to_char(t.end_date,'yyyy-MM-dd') as end_dateStr, concat(u.firstname , ' ', u.lastname) as fullname FROM tasks t INNER JOIN users u ON  t.user_id = u.id WHERE t.proj_id = $1 " + task.filter, [task.proj_id])
  },

  findCollaboratorsTasks :function(task){
    return db.query("SELECT t.*, to_char(t.start_date,'yyyy-MM-dd') as start_dateStr, to_char(t.end_date,'yyyy-MM-dd') as end_dateStr, concat(u.firstname , ' ', u.lastname) as fullname FROM tasks t INNER JOIN users u ON  t.user_id = u.id WHERE proj_id=$1 and user_id = $2 ", [task.proj_id, task.user_id])
  }
}

module.exports = task
