const express = require('express');
const userRoutes =express.Router();;

const usersController = require('../controllers/movies-controller');


userRoutes.get('/', usersController.index);
userRoutes.post('/', usersController.create);
userRoutes.get('/:id', usersController.show);
userRoutes.put('/:id', usersController.update);

module.exports = userRoutes;
