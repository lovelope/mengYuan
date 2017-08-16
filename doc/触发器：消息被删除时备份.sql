
delimiter //
CREATE TRIGGER del_msg_bak BEFORE DELETE ON `mengyuan`.`message` FOR EACH ROW
BEGIN
	INSERT INTO message_bak ( mid, publish_time, wechat, type, content, title, topic )
VALUES
	(
	old.mid,
	old.publish_time,
	old.wechat,
	old.type,
	old.content,
	old.title,
	old.topic
	);

END ;
// delimiter ;
