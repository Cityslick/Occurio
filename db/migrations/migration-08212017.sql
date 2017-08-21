\c simplemgmt_dev;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username UNIQUE NOT NULL,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    password UNIQUE NOT NULL,
    email VARCHAR(255),
    img_url VARCHAR(255),
    proj_link VARCHAR(255),
    user_type VARCHAR(255),
);

CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    category VARCHAR(255),
    status VARCHAR(1),
    planned_start_date DATE,
    planned_end_date DATE,
    act_start_date DATE,
    act_end_date DATE,
    user_id INT REFERENCES users(id),
);

CREATE TABLE IF NOT EXISTS collaborators (
    proj_id INT REFERENCES projects(id),
    user_id INT REFERENCES users(id),
);

CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    description TEXT,
    start_date DATE,
    end_date DATE,
    status VARCHAR(1),
    ticket TEXT,
)