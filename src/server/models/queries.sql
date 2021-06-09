

--  >>  Users Table  <<
CREATE TABLE users (
    id SERIAL,
    first_name VARCHAR(200) NOT NULL,
    last_name VARCHAR(200) NOT NULL,
    username VARCHAR(200) NOT NULL UNIQUE,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    PRIMARY KEY(id)
  );

--  >>  Progress Table  <<
CREATE TABLE progress (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    progress_type_id INT NOT NULL,
    company VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    comments VARCHAR(255) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(progress_type_id) REFERENCES progress_types(id)
  );

--  >>  Progress Types Table  <<
CREATE TABLE progress_types (
    id SERIAL,
    type_name VARCHAR(255) NOT NULL,
    type_points INT NOT NULL,
    PRIMARY KEY(id)
  );

-- >>  User User Groups Table  <<
CREATE TABLE user_groups (
    user_id INT NOT NULL,
    group_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(group_id) REFERENCES groups(id)
  );

--  >>  Groups Table  <<
CREATE TABLE groups (
    id SERIAL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
  );

--  >>  Sessions Table  <<
CREATE TABLE sessions (
    ssid INT UNIQUE NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(ssid),
    FOREIGN KEY(user_id) REFERENCES users(id)
  );


--*** ADDING USER FORMAT ***
INSERT INTO users (
    first_name,
    last_name,
    username,
    email,
    password
) VALUES (
    'Nathaniel',
    'Armstrong',
    'n8',
    'ncarmstrong@ymail.com',
    'gnar'
)

--UPDATING TABLES AFTER CREATION
ALTER TABLE sessions
ADD user_id varchar(200)

