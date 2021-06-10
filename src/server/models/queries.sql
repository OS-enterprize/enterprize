

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


--ADDING A PROGRESS ITEMS
INSERT INTO progress
(user_id, progress_type_id, company, comments) 
VALUES 
('2', '2', 'Amazon', 'Regrettfully filled out job application'),
('2', '5', 'Google', 'About to be a Googler baby!'),
('2', '4', 'Netflix', 'Had an in person interview - Netflix wishes...'),
('2', '2', 'Microsoft', 'Filled out job application'),
('2', '1', 'Birkshire', 'Sent out a resume')


--PROGRESS TYPES
INSERT INTO progress_types
(type_name, type_points) 
VALUES 
('Quick Apply', '1'),
('Manual Apply', '10'),
('Phone Screen', '50'),
('Final Round', '100'),
('Offer', '500')


--DELETING A PROGRESS ITEM
DELETE FROM progress WHERE id='9' AND user_id='2'


--UPDATING A PROGRESS ITEM



--USING JOIN TO SELECT PROGRESS_TYPES_ID W/ THEIR NAMES
SELECT p.*, pt.type_name
FROM progress p
JOIN progress_types pt ON p.progress_type_id=pt.id
