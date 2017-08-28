\c simplemgmt_dev;

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  sender INTEGER REFERENCES users(id),
  message TEXT,
  reciever INTEGER REFERENCES users(id),
  user_id INTEGER REFERENCES users(id)
)
