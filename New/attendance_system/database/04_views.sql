-- Attendance Summary View
CREATE OR REPLACE VIEW attendance_summary AS
SELECT 
    e.emp_id,
    e.first_name,
    e.last_name,
    DATE_FORMAT(da.attendance_date, '%Y-%m') as month,
    COUNT(DISTINCT da.attendance_date) as days_present
FROM employees e
LEFT JOIN daily_attendance da ON e.emp_id = da.emp_id
GROUP BY e.emp_id, month;

-- Active Leave Requests View
CREATE OR REPLACE VIEW active_leave_requests AS
SELECT 
    lr.request_id,
    CONCAT(e.first_name, ' ', e.last_name) as employee_name,
    lr.start_date,
    lr.end_date,
    lr.status
FROM leave_requests lr
JOIN employees e ON lr.emp_id = e.emp_id
WHERE lr.status = 'pending';
