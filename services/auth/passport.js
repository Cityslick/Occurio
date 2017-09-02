const passport = require('passport');
const User = require('../../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  passport.deserializeUser((username, done) => {
    console.log('deserializeUsers')

    User.findByUserName(username)
      .then(user => {
        console.log('deserializeUsers2')
        done(null, user);
      }).catch(err => {
        done(err, null);
      });
  });
};
