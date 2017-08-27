const db = require('../db/config');
const Project = {

  // PROJECTS
  create : function(project){
    return db.one(`INSERT INTO projects(name, description, category , status ,
                  planned_start_date , planned_end_date,user_id ) VALUES( $1, $2, $3, $4, $5, $6,  $7) RETURNING *`,
                  [project.name, project.description, project.category, project.status,
                  project.planned_start_date, project.planned_end_date,project.user_id])
  },

  update : function(project,proj_id){
    return db.one('UPDATE projects set name=$1, description=$2, category=$3, status=$4,planned_start_date=$5,planned_end_date=$6 WHERE id=$7 RETURNING *',
                [project.name, project.description, project.category, project.status,project.planned_start_date, project.planned_end_date,proj_id])
  },

  findAll : function(){
    return db.query("SELECT u.username, concat(u.firstname , ' ' , u.lastname) as fullname ,p.*,to_char(p.planned_end_date,'yyyy-MM-dd') as planned_end_datestr, to_char(p.planned_start_date,'yyyy-MM-dd') as planned_start_datestr,'here' FROM projects p INNER JOIN  users u on p.user_id= u.id order by p.id ");
  },

  findCollaboratorProjects : function(user_id){
    return db.query("SELECT p.*,to_char(p.planned_end_date,'yyyy-MM-dd') as planned_end_datestr, to_char(p.planned_start_date,'yyyy-MM-dd') as planned_start_datestr,'here' FROM projects p INNER JOIN collaborators c on p.id= c.proj_id WHERE c.user_id=$1 order by p.id ",[user_id]);
  },

  findUsersProject : function(user_id){
    return db.query("SELECT u.username, concat(u.firstname , ' ' , u.lastname) as fullname ,p.*,to_char(p.planned_end_date,'yyyy-MM-dd') as planned_end_datestr, to_char(p.planned_start_date,'yyyy-MM-dd') as planned_start_datestr,'here' FROM projects p INNER JOIN  users u on p.user_id= u.id WHERE p.user_id=$1 order by p.id",[user_id]);
  },

  findById : function(projectId){
    return db.one("SELECT *,to_char(planned_end_date,'yyyy-MM-dd') as planned_end_datestr, to_char(planned_start_date,'yyyy-MM-dd') as planned_start_datestr,'here' FROM projects WHERE id=$1", [projectId]);
  },

  delete : function(projectId){
    return db.none("DELETE FROM projects WHERE id=$1", [projectId])
  },

  findCollaborators : function(projectId){
    return db.query("SELECT u.username,u.id as user_id_new, concat(u.firstname , ' ' , u.lastname) as fullname ,p.* FROM projects p   INNER JOIN collaborators c ON  p.id = c.proj_id  INNER JOIN users u  ON u.id= c.user_id WHERE  proj_id=$1 ",[projectId])
  },

  findProjectsById : function(user_id) {
    return db.query("SELECT * FROM projects WHERE user_id = $1 RETURNING *", [user_id])
  },

}


module.exports = Project;
