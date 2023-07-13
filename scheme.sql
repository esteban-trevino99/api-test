create database codifin_test_esteban;
use codifin_test_esteban;

create table posts (
	id int primary key not null,
	user_id int not null,
	title varchar(100) not null,
	body tinytext
);

create table post_comments (
	id int primary key auto_increment,
	post_id int not null,
	name varchar(100) not null,
	email varchar(100) not null,
	body text,
	FOREIGN KEY (post_id) REFERENCES posts(id)
)