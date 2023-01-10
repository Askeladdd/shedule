drop table if exists plan;
drop table if exists actual;
drop table if exists content;
drop table if exists groupp;
drop table if exists subject;
drop table if exists type_work;
drop table if exists sort_work;
drop table if exists student;

--Основная, совм. или др.
CREATE TABLE sort_work (
                           id int AUTO_INCREMENT,
                           name VARCHAR(50),
                           PRIMARY KEY (id)
);

--Вид занятий
CREATE TABLE type_work (
                      id int AUTO_INCREMENT,
                      name VARCHAR(50),
                      short_name VARCHAR(10),
                      PRIMARY KEY (id)
);

--Дисциплина
CREATE TABLE subject (
                         id int AUTO_INCREMENT,
                         name VARCHAR(40) NOT NULL,
                         PRIMARY KEY (id)
);

--Группы студентов
CREATE TABLE groupp (
                        id int AUTO_INCREMENT,
                        name  VARCHAR(10),
                        count INTEGER,
                        PRIMARY KEY (id)
);

--Темы по дисциплинам
CREATE TABLE content (
                         id int AUTO_INCREMENT,
                         theme VARCHAR(50),
                         count INTEGER,
                         subject_id INTEGER NOT NULL,
                         type_id INTEGER NOT NULL,
                         PRIMARY KEY (id),
                         FOREIGN KEY ( subject_id ) REFERENCES subject ( id ),
                         FOREIGN KEY ( type_id ) REFERENCES type_work ( id )
);

--Выполнение плана
CREATE TABLE actual (
                           id int AUTO_INCREMENT,
                           date DATE,
                           count NUMBER,
                           subject_id INTEGER NOT NULL,
                           group_id INTEGER NOT NULL,
                           type_id INTEGER NOT NULL,
                           sort_id INTEGER NOT NULL,
                           PRIMARY KEY (id),
                           FOREIGN KEY ( type_id ) REFERENCES type_work ( id ),
                           FOREIGN KEY ( group_id ) REFERENCES groupp ( id ),
                           FOREIGN KEY ( subject_id ) REFERENCES subject ( id ),
                           FOREIGN KEY ( sort_id ) REFERENCES sort_work ( id )
);

--План
CREATE TABLE plan (
                      id int AUTO_INCREMENT,
                      date_begin DATE,
                      date_end DATE,
                      count NUMBER,
                      subject_id INTEGER NOT NULL,
                      type_id INTEGER NOT NULL,
                      group_id INTEGER NOT NULL,
                      sort_id INTEGER NOT NULL,
                      PRIMARY KEY (id),
                      FOREIGN KEY ( type_id ) REFERENCES type_work ( id ),
                      FOREIGN KEY ( group_id ) REFERENCES groupp ( id ),
                      FOREIGN KEY ( subject_id ) REFERENCES subject ( id ),
                      FOREIGN KEY ( sort_id ) REFERENCES sort_work ( id )
);

--Студент
CREATE TABLE student (
                      id int AUTO_INCREMENT,
                      surname varchar(20) not null,
                      name varchar(20) not null,
                      patronymic varchar(20) not null,
                      group_id INTEGER NOT NULL,
                      PRIMARY KEY (id),
                      FOREIGN KEY ( group_id ) REFERENCES groupp ( id )
);