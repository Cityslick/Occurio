const db = require('../db/config');

const User = {

  findByUserName: function(userName) {
    return db.oneOrNone(`
      SELECT *, concat(firstname , ' ' , lastname) as fullname FROM users
      WHERE username = $1
    `, [userName]);
  },

  findByUserId: function(userId){
    return db.one(`
      SELECT * , concat(firstname , ' ', lastname) as fullname FROM users
      WHERE id = $1
    `, [userId]);
  },

  findAll: function(){
    return db.query("SELECT *, concat(firstname , ' ', lastname) as fullname FROM users")
  },

  create: function(user){
    return db.one(`
      INSERT INTO users
      (username, firstname, lastname, password, email, img_url, proj_link, user_type)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [user.username, user.firstname, user.lastname, user.password, user.email, user.img_url, user.proj_link, user.user_type]);
  },

  update: function(user, id){
    return db.one(`
      UPDATE users SET
      username = $1,
      firstname = $2,
      lastname = $3,
      password = $4,
      email = $5,
      img_url = $6,
      proj_link = $7,
      user_type = $8
      WHERE id = $9
      RETURNING *
    `, [user.username, user.firstname, user.lastname, user.password, user.email, user.img_url, user.proj_link, user.user_type, id]);
  }
}

module.exports = User;
