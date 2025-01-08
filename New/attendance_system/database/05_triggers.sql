DELIMITER //

-- Attendance Status Trigger
CREATE TRIGGER update_attendance_status
AFTER UPDATE ON daily_attendance
FOR EACH ROW
BEGIN
    IF TIMESTAMPDIFF(HOUR, NEW.punch_in, NEW.punch_out) < 4 THEN
        UPDATE daily_attendance
        SET status = 'half-day'
        WHERE attendance_id = NEW.attendance_id;
    END IF;
END //

DELIMITER ;
