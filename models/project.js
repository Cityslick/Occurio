const db = require('../db/config');
const Project = {

  // PROJECTS
  create : function(project){
    return db.one(`INSERT INTO projects(name, description, category , status ,
                  planned_start_date , planned_end_date ) VALUES( $1, $2, $3, $4, $5, $6) RETURNING *`,
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
  }

}


module.exports = Project;
