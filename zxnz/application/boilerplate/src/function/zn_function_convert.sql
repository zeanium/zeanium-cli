set global log_bin_trust_function_creators = 1;
----
DROP FUNCTION IF EXISTS zn_test_convert_user;
CREATE FUNCTION zn_test_convert_user($id int(11))
RETURNS VARCHAR(50)
BEGIN
DECLARE _temp varchar(50);
select user_name INTO _temp from zn_test_user where id=$id;
RETURN _temp;
END
----

