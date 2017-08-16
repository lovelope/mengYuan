SELECT
	* 
FROM
	message 
WHERE
	wechat = 'wechat11' 
	AND type = 'String' 
ORDER BY
	publish_time DESC 
	LIMIT 10,
	10;