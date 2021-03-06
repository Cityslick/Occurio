const Task = require("../models/task");

const taskController={
  assignTasks: function(req, res){
    Task.assignTasks({
      user_id:req.body.user_id,
      proj_id:req.body.proj_id,
      name :req.body.name,
      description: req.body.description,
      start_date:req.body.start_date,
      end_date:req.body.end_date,
      start_date:req.body.start_date,
      end_date:req.body.end_date,
      status:req.body.status,
      ticket:req.body.ticket,
    }).then(task=>{
      res.json({
        message:"Done",
        data: task,
      })
    }).catch(err =>{
      res.status(500).json(err);
    })
  },

  updateTasks: function(req, res){
    Task.updateTasks({
      user_id:req.body.user_id,
      name:req.body.name,
      description: req.body.description,
      start_date:req.body.start_date,
      end_date:req.body.end_date,
      act_start_date:req.body.act_start_date,
      act_end_date:req.body.act_end_date,
      status:req.body.status,
      ticket:req.body.ticket,
      user_type:req.body.user_type,
    },req.params.task_id).then(()=>{
      res.json({
        message:"Done",
      })
    }).catch(err=>{
        res.status(500).json(err);
    })
  },

  deleteTask: function(req, res){
    Task.deleteTask(req.params.task_id)
    .then(()=>{
      res.json({
        message:"Done",
      })
    }).catch(err=>{
        res.status(500).json(err);
    })
  },

  findProjectTasks :function(req, res){
    Task.findProjectTasks({
      proj_id:req.body.proj_id,
      filter :req.body.filter || "",
    })
    .then((task)=>{
      res.json({
        message:"Done",
        data:task
      })
    }).catch(err=>{
        res.status(500).json(err);
    })
  },

  findCollaboratorsTasks :function(req, res){
    Task.findCollaboratorsTasks({
      user_id:req.body.user_id,
      proj_id:req.body.proj_id,
    }).then((task)=>{
      res.json({
        message:"Done",
        data:task
      })
    }).catch(err=>{
        res.status(500).json(err);
    })
  },

  findById :function(req, res){
    Task.findById(req.params.task_id)
    .then((task)=>{
      res.json({
        message:"Done",
        data:task
      })
    }).catch(err=>{
        res.status(500).json(err);
    })
  }
}


module.exports = taskController;
