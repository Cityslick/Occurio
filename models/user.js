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
    console.log(user);
    return db.one(`
      INSERT INTO users
      (username, firstname, lastname, password, email, img_url, proj_link, user_type)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [user.username, user.firstname, user.lastname, user.password, user.email, user.img_url, user.proj_link, user.user_type]);
  },

  update: function(user, id){
    console.log(user);
    if (user.updatePass){
      return db.none(`
        UPDATE users SET
        password = $1
        WHERE id = $2
      `, [user.password,user.id]);
    }else{
      console.log("here");
      return db.one(`
        UPDATE users SET
        username = $1,
        firstname = $2,
        lastname = $3,
        email = $4,
        img_url = $5,
        proj_link = $6,
        user_type = $7
        WHERE id = $8
        RETURNING *
      `, [user.username, user.firstname, user.lastname, user.email, user.img_url, user.proj_link, user.user_type, id]);
    }
  }
}

module.exports = User;
