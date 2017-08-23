const express = require('express');
const authRouter = express.Router();
const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');
const usersController = require('../controllers/usersController');



authRouter.post('/', usersController.create);
authRouter.put('/:id', usersController.update);

authRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure',
    failureFlash: false,
  })
);

authRouter.get('/success', (req, res) => {
    res.json({
      auth: true,
      message: 'ok',
      user: req.user,
    });
});

authRouter.get('/failure', (req, res) => {
  res.json({
    auth: false,
    message: 'Login failed',
    user: null,
  });
});

authRouter.get('/logout', (req, res) => {
  req.logout();
  res.json({
    message: 'logged out',
    auth: false,
  })
});

module.exports = authRouter;



