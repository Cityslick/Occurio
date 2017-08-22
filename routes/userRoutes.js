const express = require('express');
const userRoutes = express.Router();

const usersController = require('../controllers/usersController');


userRoutes.get('/user', usersController.index);
userRoutes.post('/', usersController.create);
userRoutes.get('/:username', usersController.show);
userRoutes.put('/:id', usersController.update);

module.exports = userRoutes;