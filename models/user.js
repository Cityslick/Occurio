const db = require('../db/config');

const User = {};

User.findByUserName = userName => {
  return db.oneOrNone(`
    SELECT * FROM users
    WHERE username = $1
  `, [userName]);
};

User.findAll = () => {
  return db.query('SELECT * FROM users');
}

User.create = user => {
  return db.one(`
    INSERT INTO users
    (username, firstname, lastname, password, email, img_url, proj_link, user_type)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `, [user.username, user.firstname, user.lastname, user.password, user.email, user.img_url, user.proj_link, user.user_type]);
};

User.update = (movie, id) => {
  return db.one(`
    UPDATE users SET
    username = $1,
    firstname = $2,
    lastname = $3,
    password = $4,
    email = $5,
    img_url = $6,
    proj_link = $7,
    user_type = $8,
    WHERE id = $9
    RETURNING *
  `, [user.username, user.firstname, user.lastname, user.password, user.email, user.img_url, user.proj_link, user.user_type, id]);
}

module.exports = User;
