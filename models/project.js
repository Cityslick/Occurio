const db = require('../db/config');
const Project = {

  // PROJECTS
  create : function(project){
    return db.one(`INSERT INTO projects(name, description, category , status ,
                  planned_start_date , planned_end_date ) VALUES( $1, $2, $3, $4, $5, 6$) RETURN *`,
                  [project.name, project.description, project.category, project.status,
                  project.planned_start_date, project.planned_end_date])
  },

  update : function(project){
    return db.one('UPDATE projects set name=$1, description=$2, category=$3, status=$4, planned_start_date=$5, planned_end_date=$6',[project.name, project.description, project.category, project.status,project.planned_start_date. project.planned_end_date])
  },

  findAll : function(){
    return db.query("SELECT * FROM projects ");
  },

  findById : function(projectId){
    return db.one("SELECT * FROM projects WHERE id=$1", [projectId]);
  },

  delete : function(projectId){
    return db.none("DELETE FROM projects WHERE id=$1", [projectId])
  },

  findCollaborators : function(projectId){
    return db.query("SELECT u.username, concat(u.firstname , ' ' , u.lastname) as fullname ,p.* FROM projects p   INNER JOIN collaborators c ON  p.id = c.proj_id  INNER JOIN users u  ON u.id= c.user_id WHERE  proj_id=$1 ",[projectId])
  },

  // PROJECTS COLLABORATOR
  assignCollaborators : function(projectId,userId){
    return db.none("INSERT INTO collaborators VALUES($1,$2)",[projectId, userId]);
  },

  deleteCollaborators : function(projectId,userId){
    return db.none("DELETE FROM  collaborators WHERE projectId = $1 AND  userId= $2", [projectId,userId]);
  },

  findCollaboratorProjects : function(userId){
    return db.query("SELECT u.username, concat(u.firstname , ' ' , u.lastname) as fullname ,p.* FROM projects p   INNER JOIN collaborators c ON  p.id = c.proj_id  INNER JOIN users u  ON u.id= c.user_id WHERE  user_id=$1 ",[userId])
  },

  // COLLABORATORS TASKS
  assignTasks: function(task){
    return db.none("INSERT INTO tasks(user_id, proj_id, description, start_date, end_date, status, ticket) VALUES( $1, 2$, $3, $4, $5, $6,$7)",
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

  findCollaboratorsTasks :function(userId){
    return db.query("SELECT * FROM tasks WHERE user_id = $1", [projectId])
  }

}


module.exports = Project;
