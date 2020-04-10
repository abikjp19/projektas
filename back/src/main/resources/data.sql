drop table if exists project;

create table project (
	id int auto_increment primary key,
	projectTitle varchar(250),
	projectDescription varchar(250),
	totalTasks int,
	unfinishedTasks int,
	isFinished boolean
);

insert into project (projectTitle, projectDescription, totalTasks, unfinishedTasks, isFinished) values
	('project1', 'Cha cha cha', 22, 21, false),
	('project2', 'Chi chi chi', 10, 0, true),
	('project3', 'Cho cho cho', 16, 8, false);