const db = require("../db/config")
const Collaborators={
// PROJECTS COLLABORATOR
  assignCollaborators : function(collaborator){
    return db.none("INSERT INTO collaborators VALUES($1,$2)",
    [collaborator.projectId, collaborator.userId]);
  },

  deleteCollaborators : function(collaborator){
    return db.none("DELETE FROM  collaborators WHERE proj_Id = $1 AND  user_Id= $2",
    [collaborator.proj_id,collaborator.user_id]);
  },

  findCollaboratorProjects : function(userId){
    return db.query("SELECT u.username, concat(u.firstname , ' ' , u.lastname) as fullname,c.user_id as userid,p.* FROM projects p   INNER JOIN collaborators c ON  p.id = c.proj_id  INNER JOIN users u  ON u.id= c.user_id WHERE  c.proj_id=$1 ",
      [userId])
  }
}

module.exports = Collaborators;
