const Project = require("../models/project.js")


projectController={
  //PROJECTS
  create: function(req, res){

  },

  update: function(req,res){

  },

  findAll: function (req, res){
    Project.findAll()
    .then(project => {
      res.json({
        message: 'Done',
        data: project,
      });
    }).catch(err =>{
      res.status(500).json(err);
    })
  },

  findById: function (req, res){
    Project.findById(req.params.id)
    .then(project => {
      res.json({
        message: 'Done',
        data: project,
      });
    }).catch(err =>{
      res.status(500).json(err);
    })
  },

  delete: function (req, res){

  },

  findCollaborators: function(req, res){

  },

  // PROJECTS COLLABORATOR
  assignCollaborators : function(req, res){

  },


  deleteCollaborators: function(){

  },


  findCollaboratorProjects: function(req, res){

  },
  //COLLABORATORS

  assignTasks: function(req, res){

  },

  updateTasks : function(req, res){

  },

  deleteTask: function(req, res){

  },

  findProjectTasks: function(req, res){

  },

  findCollaboratorsTasks: function (req, res){

  }



}


module.exports= projectController;
