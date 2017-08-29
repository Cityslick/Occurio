const Message = require('../models/messages.js')

messageController = {

  create: function(req, res) {
    console.log("COntroler", req.body)
    Message.create({
      sender: req.body.sender,
      message: req.body.message,
      reciever: req.body.reciever,
    }).then(message =>{
      res.json({
        message:"done",
        data: message,
      })
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  },

  findAll: function(req, res) {
    Message.findAll()
    .then(message => {
      res.json({
        message: 'Done',
        data: message,
      });
    }).catch(err => {
      res.status(500).json(err);
    })
  },

  findById: function (req, res){
    Message.findById(req.params.id)
    .then(message => {
        res.json({
          data: message,
        })
      }).catch(err =>{
      res.status(500).json(err);
    })
  },

  delete: function (req, res){
    Message.delete(req.params.id)
    .then(message => {
      res.json({
        data: message,
      })
    }).catch(err => {
      res.status(500).json(err);
    })
  }
}

module.exports = messageController;
