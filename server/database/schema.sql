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
  mail varchar(80) not null,
  sex varchar(10),
  birthday date,
  postal_code_id int,
  foreign key(postal_code_id) references postalcode(id),
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
  foreign key(user_id) references user(id)
);

create table booking (
  id int primary key auto_increment not null,
  date datetime,
  vehicle_id int,
  foreign key(vehicle_id) references vehicle(id),
  station_id int,
  foreign key(station_id) references station(id)
);

create table contact (
  id int primary key auto_increment not null,
  ask_type varchar(80) not null,
  name varchar(80) not null,
  mail varchar(80) not null,
  message text not null
);

insert into region (name) values ('Ile-de-France');

insert into department (name, region_id) values ('Paris', 1);

insert into city (name, department_id) values ('Paris', 1);

insert into postalcode (code, city_id) values ('75001', 1);

insert into user (firstname, lastname, mail, sex, birthday, postal_code_id, number_of_vehicles) values ('John', 'Doe', 'john.doe@gmail.com', 'Masculin', '1990-01-01', 1, 1);insert into region (name) values ('Ile-de-France');