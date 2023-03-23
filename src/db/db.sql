-- create the db if it doesn't exist
IF NOT EXISTS CREATE DATABASE travel_bud_db;

-- set the context to be said db
USE travel_bud_db;

-- users table
IF NOT EXISTS CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    email varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

-- itinerary table
IF NOT EXISTS CREATE TABLE itinerary (
    id int NOT NULL AUTO_INCREMENT,
    itinerary_name varchar(1000) NOT NULL,
    itinerary_start_date DATE NOT NULL,
    itinerary_end_date DATE NOT NULL,
    PRIMARY KEY (id)
);

-- user roles table
IF NOT EXISTS CREATE TABLE user_roles (
    id int NOT NULL AUTO_INCREMENT,
    role_name varchar(255) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

-- insert the roles into the role table
INSERT INTO user_roles
VALUES ("OWNER");
INSERT INTO user_roles
VALUES ("EDITOR");
INSERT INTO user_roles
VALUES ("VIEWER");

-- user itineraries table
IF NOT EXISTS CREATE TABLE user_itineraries (
    user_id int NOT NULL AUTO_INCREMENT,
    itinerary_id int NOT NULL,
    user_role varchar(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (itinerary_id) REFERENCES itinerary(id),
    FOREIGN KEY (user_role) REFERENCES user_roles(role_name)
);

-- itinerary_days table
IF NOT EXISTS CREATE TABLE itinerary_days (
    id int NOT NULL AUTO_INCREMENT,
    itinerary_id int NOT NULL,
    day_date DATE NOT NULL,
    colour varchar(255) NOT NULL,
    raw_data JSON,
    FOREIGN KEY (itinerary_id) REFERENCES itinerary(id),
    PRIMARY KEY (id)
);