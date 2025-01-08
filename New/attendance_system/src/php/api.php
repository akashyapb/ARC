<?php
header('Content-Type: application/json');
require_once '../config/db_config.php';
require_once 'auth.php';

$auth = new Auth($pdo);

// Check if user is logged in
if (!$auth->isLoggedIn()) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$action = $_GET['action'] ?? '';

switch($action) {
    case 'punch-in':
        handlePunchIn($pdo);
        break;

    case 'punch-out':
        handlePunchOut($pdo);
        break;

    case 'submit-leave':
        handleLeaveRequest($pdo);
        break;

    case 'get-attendance':
        getAttendanceData($pdo);
        break;

    case 'get-leave-requests':
        getLeaveRequests($pdo);
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Invalid endpoint']);
}

function handlePunchIn($pdo) {
    try {
        $stmt = $pdo->prepare("CALL RecordPunchIn(?)");
        $stmt->execute([$_SESSION['user_id']]);
        echo json_encode(['success' => true, 'message' => 'Punch in recorded']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}

function handlePunchOut($pdo) {
    try {
        $stmt = $pdo->prepare("CALL RecordPunchOut(?)");
        $stmt->execute([$_SESSION['user_id']]);
        echo json_encode(['success' => true, 'message' => 'Punch out recorded']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}

function handleLeaveRequest($pdo) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    try {
        $stmt = $pdo->prepare("CALL SubmitLeaveRequest(?, ?, ?, ?)");
        $stmt->execute([
            $_SESSION['user_id'],
            $data['start_date'],
            $data['end_date'],
            $data['reason']
        ]);
        echo json_encode(['success' => true, 'message' => 'Leave request submitted']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}

function getAttendanceData($pdo) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM attendance_summary WHERE emp_id = ?");
        $stmt->execute([$_SESSION['user_id']]);
        echo json_encode(['data' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}

function getLeaveRequests($pdo) {
    if (!$auth->isAdmin()) {
        http_response_code(403);
        echo json_encode(['error' => 'Forbidden']);
        return;
    }

    try {
        $stmt = $pdo->query("SELECT * FROM active_leave_requests");
        echo json_encode(['data' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>
