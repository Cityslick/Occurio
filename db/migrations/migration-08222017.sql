\c simplemgmt_dev;

ALTER TABLE  IF EXISTS tasks
ADD COLUMN IF NOT EXISTS proj_id INTEGER REFERENCES projects(id);

ALTER TABLE IF EXISTS projects
ALTER COLUMN status TYPE VARCHAR(100);

ALTER TABLE IF EXISTS tasks
ALTER COLUMN status TYPE VARCHAR(100);

ALTER TABLE IF EXISTS users
ALTER COLUMN user_type TYPE VARCHAR(100);
