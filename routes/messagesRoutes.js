const express = require("express");
const messagesRoutes = express.Router();
const messageController = require("../controllers/messageController");

messagesRoutes.post("/", messageController.create);
messagesRoutes.get("/:reciever", messageController.findAll);
messagesRoutes.get("/:id", messageController.findById);
messagesRoutes.post("/:id", messageController.findAll);
messagesRoutes.delete("/:id", messageController.delete);

module.exports = messagesRoutes;
