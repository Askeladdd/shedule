INSERT INTO type_work( name, short_name ) VALUES ('лекции', 'лк');
INSERT INTO type_work( name, short_name ) VALUES ('практические', 'пр');
INSERT INTO type_work( name, short_name ) VALUES ('лабораторные', 'лб');
INSERT INTO type_work( name, short_name ) VALUES ('консультации', 'конс');
INSERT INTO type_work( name, short_name ) VALUES ('консультации', 'конс');
INSERT INTO type_work( name, short_name ) VALUES ('экзамены', 'экз');
INSERT INTO type_work( name, short_name ) VALUES ('зачеты', 'зач');
INSERT INTO type_work( name, short_name ) VALUES ('курсовое проектирование', 'кп');
INSERT INTO type_work( name, short_name ) VALUES ('дипломное проектирование', 'дп');
INSERT INTO type_work( name, short_name ) VALUES ('практика', 'практ');
INSERT INTO type_work( name, short_name ) VALUES ('госэкзамен', 'ГЭК');

INSERT INTO subject(name) VALUES ('АИЯП');
INSERT INTO subject(name) VALUES ('Мехатроника');
INSERT INTO subject(name) VALUES ('ОСТЗ');
INSERT INTO subject(name) VALUES ('ТОПП');
INSERT INTO subject(name) VALUES ('ГЭК');
INSERT INTO subject(name) VALUES ('ДП');

INSERT INTO groupp( name, count ) VALUES ('КМ-1', 17);
INSERT INTO groupp( name, count ) VALUES ('КМ-2', 19);
INSERT INTO groupp( name, count ) VALUES ('КМ-3', 20);
INSERT INTO groupp( name, count ) VALUES ('КМ-4', 20);
INSERT INTO groupp( name, count ) VALUES ('КМ-5', 20);

INSERT INTO content ( theme, count, subject_id, type_id ) VALUES ('Введение', 2, 1, 1);
INSERT INTO content ( theme, count, subject_id, type_id ) VALUES ('Тема 1', 4, 1, 1);
INSERT INTO content ( theme, count, subject_id, type_id ) VALUES ('Тема 2', 2, 1, 1);
INSERT INTO content ( theme, count, subject_id, type_id ) VALUES ('Тема 3', 2, 1, 2);

INSERT INTO plan ( date_begin, date_end, count, subject_id, type_id, group_id) VALUES ('2020-1-1', '2021-1-2', 16, 1, 1, 1);
INSERT INTO plan ( date_begin, date_end, count, subject_id, type_id, group_id) VALUES ('2020-1-1', '2021-1-2', 32, 1, 1, 1);
INSERT INTO plan ( date_begin, date_end, count, subject_id, type_id, group_id) VALUES ('2020-1-1', '2021-2-10', 16, 1, 1, 1);

INSERT INTO actual ( date, count, subject_id, group_id, type_id ) VALUES ('2020-1-1', 2, 1, 1, 1);
INSERT INTO actual ( date, count, subject_id, group_id, type_id )VALUES ('2020-1-2', 2, 1, 1, 1);
INSERT INTO actual ( date, count, subject_id, group_id, type_id )VALUES ('2020-1-3', 2, 1, 1, 1);