INSERT INTO user(username, password, full_name, address, phone, status, token)
VALUES ('user1', '123456', 'Nguyen Van A', 'TPHCM', '0123456789', 'OFFLINE', 'adfasdfasdfasdfsdfabc123'),
       ('user2', '123456', 'Dinh Thi B', 'Quang Binh', '0123456789', 'ONLINE', 'adfasdfasdfasdfsdf123abc'),
       ('user3', '123456', 'Cao Van C', 'Can Tho', '0123456789', 'BUSY', 'adfasdfasdfasdfsdf345abc');

INSERT INTO room(`id`, `host_username`, `name`, `hidden_password`)
VALUES ('abc1', 'user1', 'Phòng 1', '12345678_1'),
       ('abc2', 'user1', 'Phòng 2', '12345678_2'),
       ('abc3', 'user2', 'Phòng 3', '12345678_3'),
       ('abc4', 'user2', 'Phòng 4', '12345678_4'),
       ('abc5', 'user3', 'Phòng 5', '12345678_5'),
       ('abc6', 'user3', 'Phòng 6', '12345678_6'),
       ('abc7', 'user3', 'Phòng 7', '12345678_7');

INSERT INTO join_user_room(`username`, `room_id`)
VALUES ('user2', 'abc5'),
       ('user2', 'abc2'),
       ('user3', 'abc1'),
       ('user3', 'abc4');

INSERT INTO message(`username`, `room_id`, `content`)
VALUES ('user1', 'abc1', 'xin chào, tôi là user1.'),
       ('user1', 'abc2', 'xin chào phòng số 2'),
       ('user2', 'abc5', 'xin chào phòng số 5'),
       ('user2', 'abc2', 'xin chào phòng số 2'),
       ('user3', 'abc5', 'xin chào phòng số 5'),
       ('user3', 'abc1', 'rất vui được làm quen với user1'),
       ('user3', 'abc4', 'xin chào phòng số 4');


