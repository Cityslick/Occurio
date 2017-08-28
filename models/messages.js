const db = require('../db/config');
const Messages = {}

Messages.create = message => {
  return db.one(`INSERT INTO messages (sender, message, reciever) VALUES ($1, $2, $3) RETURNING * `,
[message.sender, message.message, message.reciever,])
}

Messages.findAll = id => {
  return db.query(`SELECT * FROM messages WHERE id = $1`, [id])
}

Messages.findById = messageId => {
  return db.one(`SELECT * FROM messages WHERE id = $1`, [messageid])
}

Messages.delete = messageId => {
  return db.none(`DELETE FROM messages WHERE id = $1`, [messageId])
}

module.exports = Messages;
