create table sign (
  id int primary key auto_increment not null,
  name varchar(80) not null
);

create table operator (
  id int primary key auto_increment not null,
  name varchar(80) not null
);

create table provider (
  id int primary key auto_increment not null,
  name varchar(80) not null
);

create table region (
  id int primary key auto_increment not null,
  name varchar(80) not null
);

create table department (
  id int primary key auto_increment not null,
  name varchar(80) not null,
  region_id int,
  foreign key(region_id) references region(id)
);

create table city (
  id int primary key auto_increment not null,
  name varchar(80) not null,
  department_id int,
  foreign key(department_id) references department(id)
);

create table postalcode (
  id int primary key auto_increment not null,
  code varchar(5) not null
);

create table insee_code (
  id int primary key auto_increment not null,
  code varchar(5) not null,
  city_id int,
  foreign key(city_id) references city(id)
);

create table geo_coords (
  id int primary key auto_increment not null,
  latitude float,
  longitude float
);

create table pdc (
  id int primary key auto_increment not null,
  name varchar(80) not null,
  power_max float,
  type text
);

create table station (
  id int primary key auto_increment not null,
  name varchar(255) not null,
  address text,
  sign_id int,
  foreign key(sign_id) references sign(id),
  operator_id int,
  foreign key(operator_id) references operator(id),
  provider_id int,
  foreign key(provider_id) references provider(id),
  postalcode_id int,
  foreign key(postalcode_id) references postalcode(id),
  insee_code_id int,
  foreign key(insee_code_id) references insee_code(id),
  geo_coords_id int,
  foreign key(geo_coords_id) references geo_coords(id),
  number_pdc int,
  pdc_id int,
  foreign key(pdc_id) references pdc(id),
  access_charging varchar(255),
  accessibility varchar(80),
  update_date_time datetime,
  source text
);

create table user (
  id int primary key auto_increment not null,
  firstname varchar(80) not null,
  lastname varchar(80) not null,
  hashed_password varchar(255) not null,
  mail varchar(80) not null,
  sex varchar(10),
  birthday date,
  postal_code_id int,
  foreign key(postal_code_id) references postalcode(id),
  insee_code_id int,
  foreign key(insee_code_id) references insee_code(id),
  number_of_vehicles int
);

CREATE TABLE user_photos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  url VARCHAR(255) NOT NULL,
  foreign key(user_id) references user(id)
);

create table vehicle (
  id int primary key auto_increment not null,
  model varchar(80) not null,
  brand varchar(80) not null, 
  type varchar(80) not null,
  user_id int,
  foreign key(user_id) references user(id) on delete cascade
);

create table booking (
  id int primary key auto_increment not null,
  date datetime,
  vehicle_id int,
  foreign key(vehicle_id) references vehicle(id) on delete cascade,
  station_id int,
  foreign key(station_id) references station(id) on delete cascade
);

create table contact (
  id int primary key auto_increment not null,
  ask_type varchar(80) not null,
  name varchar(80) not null,
  mail varchar(80) not null,
  message text not null
);

insert into region (name) values ('Occitanie');
insert into department (name, region_id) values ('Haute-Garonne', 1);
insert into city (name, department_id) values ('Balma', 1);
insert into insee_code (code, city_id) values ('31044', 1);
insert into postalcode (code) values ('31130');

insert into user (firstname, lastname, hashed_password, mail, sex, birthday, postal_code_id, insee_code_id, number_of_vehicles) values ('Rémi', 'Zickenheiner', '$argon2id$v=19$m=19456,t=2,p=1$09wIu8TYY/KtLHfSmHv7Iw$KQrw/OsjITIqOkEKDtAjMLLWYv4zF3OPoASCyAc7FNE', 'admin@geocode.com', 'masculin', '1890-01-01', 1, 1, 0);

-- insert into user (firstname, lastname, hashed_password, mail, sex, birthday, postal_code_id, insee_code_id, number_of_vehicles) values ('John', 'Doe', '$argon2id$v=19$m=19456,t=2,p=1$09wIu8TYY/KtLHfSmHv7Iw$KQrw/OsjITIqOkEKDtAjMLLWYv4zF3OPoASCyAc7FNE', 'john@gmail.com', 'M', '1990-01-01', 1, 1, 3);
-- insert into user (firstname, lastname, hashed_password, mail, sex, birthday, postal_code_id, insee_code_id, number_of_vehicles) values ('Jane', 'Doe', '$argon2id$v=19$m=19456,t=2,p=1$09wIu8TYY/KtLHfSmHv7Iw$KQrw/OsjITIqOkEKDtAjMLLWYv4zF3OPoASCyAc7FNE', 'jane@gmail.com', 'F', '1990-01-01', 2, 2, 3);
-- insert into user (firstname, lastname, hashed_password, mail, sex, birthday, postal_code_id, insee_code_id, number_of_vehicles) values ('Alice', 'Smith', '$argon2id$v=19$m=19456,t=2,p=1$09wIu8TYY/KtLHfSmHv7Iw$KQrw/OsjITIqOkEKDtAjMLLWYv4zF3OPoASCyAc7FNE', 'alice@gmail.com', 'F', '1990-01-01', 3, 3, 3);
-- insert into user (firstname, lastname, hashed_password, mail, sex, birthday, postal_code_id, insee_code_id, number_of_vehicles) values ('Bob', 'Smith', '$argon2id$v=19$m=19456,t=2,p=1$09wIu8TYY/KtLHfSmHv7Iw$KQrw/OsjITIqOkEKDtAjMLLWYv4zF3OPoASCyAc7FNE', 'bob@gmail.com', 'M', '1990-01-01', 4, 4, 3);
-- insert into user (firstname, lastname, hashed_password, mail, sex, birthday, postal_code_id, insee_code_id, number_of_vehicles) values ('Charlie', 'Brown', '$argon2id$v=19$m=19456,t=2,p=1$09wIu8TYY/KtLHfSmHv7Iw$KQrw/OsjITIqOkEKDtAjMLLWYv4zF3OPoASCyAc7FNE', 'charlie@gmail.com', 'M', '1990-01-01', 5, 5, 3);
-- insert into vehicle (model, brand, type, user_id) values ('Zoe', 'Renault', 'Electric', 2);
-- insert into vehicle (model, brand, type, user_id) values ('Model S', 'Tesla', 'Electric', 2);
-- insert into vehicle (model, brand, type, user_id) values ('Model 3', 'Tesla', 'Electric', 2);
-- insert into vehicle (model, brand, type, user_id) values ('Model X', 'Tesla', 'Electric', 3);
-- insert into vehicle (model, brand, type, user_id) values ('Model Y', 'Tesla', 'Electric', 3);
-- insert into vehicle (model, brand, type, user_id) values ('i3', 'BMW', 'Electric', 3);
-- insert into vehicle (model, brand, type, user_id) values ('i8', 'BMW', 'Electric', 4);
-- insert into vehicle (model, brand, type, user_id) values ('Leaf', 'Nissan', 'Electric', 4);
-- insert into vehicle (model, brand, type, user_id) values ('e-tron', 'Audi', 'Electric', 4);
-- insert into vehicle (model, brand, type, user_id) values ('e-up', 'Volkswagen', 'Electric', 5);
-- insert into vehicle (model, brand, type, user_id) values ('e-Golf', 'Volkswagen', 'Electric', 5);
-- insert into vehicle (model, brand, type, user_id) values ('Soul EV', 'Kia', 'Electric', 5);
-- insert into vehicle (model, brand, type, user_id) values ('Ioniq', 'Hyundai', 'Electric', 6);
-- insert into vehicle (model, brand, type, user_id) values ('Kona', 'Hyundai', 'Electric', 6);
-- insert into vehicle (model, brand, type, user_id) values ('e-Niro', 'Kia', 'Electric', 6);