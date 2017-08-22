const express = require('express');
const authRouter = express.Router();
const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');
const usersController = require('../controllers/usersController');


// authRouter.get('/login', authHelpers.loginRedirect, (req, res) => {
//   res.render('auth/login', {
//     currentPage: 'login',
//   });
// });

// authRouter.get('/register', authHelpers.loginRedirect, (req, res) => {
//     res.render('/auth/register', {
//         currentPage: 'register',
//     });
// });

authRouter.post('/', usersController.create);

authRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/auth',
    failureRedirect: '/auth/login',
    failureFlash: true,
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



