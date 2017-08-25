const Collaborator = require("../models/collaborator");

const collaboratorController={
// PROJECTS COLLABORATOR
  assignCollaborators : function(req, res){
    Collaborator.assignCollaborators({
      proj_id:req.body.proj_id,
      user_id:req.body.user_id,
    }).then(()=>{
      res.json({
        message:"Done",
      })
    }).catch(err=>{
        res.status(500).json(err);
    })

  },

  findCollaboratorProjects: function(req, res){
    Collaborator.findCollaboratorProjects(req.params.proj_id)
    .then(project=>{
      res.json({
        message:"Done",
        data:project,
      })
    }).catch(err=>{
        res.status(500).json(err);
    })
  },

  loadCollaborators: function(req, res){
    Collaborator.loadCollaborators({
      proj_id:req.body.proj_id,
      user_id:req.body.user_id,
    }).then(collaborator=>{
      res.json({
        message:"Done",
        data:collaborator,
      })
    }).catch(err=>{
        res.status(500).json(err);
    })
  },

  deleteCollaborators: function(req, res){
    Collaborator.deleteCollaborators({
      proj_id:req.body.proj_id,
      user_id:req.body.user_id,
    }).then(()=>{
      res.json({
        message:"Done",
      })
    }).catch(err=>{
        res.status(500).json(err);
    })

  }

}


module.exports = collaboratorController;
