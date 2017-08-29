const db = require('../db/config');
const Messages = {}

Messages.create = message => {
  console.log("Model", message)
  return db.one(`INSERT INTO messages (sender, message, reciever) VALUES ($1, $2, $3) RETURNING * `,
[message.sender, message.message, message.reciever])
}

Messages.findAll = sender => {
  return db.query(`SELECT * FROM messages WHERE sender = $1`, [sender])
}

Messages.findAllByReceiver = (sender, reciever) => {
  return db.query(`SELECT * FROM messages WHERE sender = $1 and reciever= $2`, [sender,reciever])
},


Messages.delete = messageId => {
  return db.none(`DELETE FROM messages WHERE id = $1`, [messageId])
}

module.exports = Messages;
