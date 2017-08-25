const db = require("../db/config")
const Collaborators={
// PROJECTS COLLABORATOR
  assignCollaborators : function(collaborator){
      return db.none(`
      DO
        $do$
        BEGIN
          IF NOT EXISTS(SELECT * FROM collaborators where proj_id=$1 and  user_id=$2) THEN
            INSERT INTO collaborators(proj_id,user_id) VALUES($1,$2);
          END IF;
        END
      $do$ `, [collaborator.proj_id, collaborator.user_id]);
  },

  deleteCollaborators : function(collaborator){
    return db.none("DELETE FROM  collaborators WHERE proj_Id = $1 AND  user_Id= $2",
    [collaborator.proj_id,collaborator.user_id]);
  },

  findCollaboratorProjects : function(proj_id){
    return db.query("SELECT u.username, concat(u.firstname , ' ' , u.lastname) as fullname,c.user_id as userid,p.* FROM projects p   INNER JOIN collaborators c ON  p.id = c.proj_id  INNER JOIN users u  ON u.id= c.user_id WHERE  c.proj_id=$1 ",
      [proj_id])
  },

  loadCollaborators : function(collaborator){
    return db.query("SELECT * FROM users WHERE id NOT IN(SELECT user_id FROM collaborators where proj_id=$1 and  user_id=$2)", [collaborator.proj_id, collaborator.user_id]);
  }
}

module.exports = Collaborators;
