DELIMITER //

-- Punch In Procedure
CREATE PROCEDURE RecordPunchIn(IN p_emp_id INT)
BEGIN
    INSERT INTO daily_attendance (emp_id, punch_in, attendance_date)
    VALUES (p_emp_id, NOW(), CURRENT_DATE());
END //

-- Punch Out Procedure
CREATE PROCEDURE RecordPunchOut(IN p_emp_id INT)
BEGIN
    UPDATE daily_attendance 
    SET punch_out = NOW()
    WHERE emp_id = p_emp_id 
    AND attendance_date = CURRENT_DATE()
    AND punch_out IS NULL;
END //

DELIMITER ;
