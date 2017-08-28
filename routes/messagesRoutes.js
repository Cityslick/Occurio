const express = require("express");
const messagesRoutes = express.Router();
const messageController = require("../controllers/messageController");

messagesRoutes.post("/", messageController.create);
messagesRoutes.get("/", messageController.findAll);
messagesRoutes.get("/:id", messageController.findById);
messagesRoutes.delete("/:id", messageController.delete);

module.exports = messagesRoutes;
