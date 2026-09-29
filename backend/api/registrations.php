<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/jwt_helper.php';

initCors();
AuthToken::requireAdmin();

$db = Database::getInstance();
$pdo = $db->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

// 1. GET: List registrations, filter by event, search, export CSV
if ($method === 'GET') {
    $event_id = $_GET['event_id'] ?? null;
    $search = $_GET['search'] ?? null;
    $status = $_GET['status'] ?? null;
    $export = $_GET['export'] ?? null;

    if (!$pdo) sendJsonResponse(true, 'Registrations (simulated)', []);

    try {
        $sql = "SELECT r.*, e.title as event_title, e.category as event_category 
                FROM event_registrations r 
                JOIN events e ON r.event_id = e.id 
                WHERE 1=1 ";
        $params = [];

        if (!empty($event_id) && $event_id !== 'All') {
            $sql .= " AND r.event_id = :event_id";
            $params[':event_id'] = $event_id;
        }

        if (!empty($status) && $status !== 'All') {
            $sql .= " AND r.status = :status";
            $params[':status'] = $status;
        }

        if (!empty($search)) {
            $sql .= " AND (r.full_name LIKE :search OR r.email LIKE :search OR r.phone LIKE :search OR r.reg_code LIKE :search OR r.college LIKE :search)";
            $params[':search'] = "%$search%";
        }

        $sql .= " ORDER BY r.registered_at DESC";

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $registrations = $stmt->fetchAll();

        // If CSV export requested
        if ($export === 'csv') {
            header('Content-Type: text/csv; charset=utf-8');
            header('Content-Disposition: attachment; filename=ecell_registrations_' . date('Y-m-d_His') . '.csv');
            $output = fopen('php://output', 'w');
            fputcsv($output, ['Reg ID', 'Event Title', 'Participant Name', 'Email', 'Phone', 'College', 'Course', 'Year', 'Student ID', 'LinkedIn', 'Status', 'Registered At']);
            foreach ($registrations as $row) {
                fputcsv($output, [
                    $row['reg_code'],
                    $row['event_title'],
                    $row['full_name'],
                    $row['email'],
                    $row['phone'],
                    $row['college'],
                    $row['course'],
                    $row['semester_year'],
                    $row['student_id'],
                    $row['linkedin_url'],
                    $row['status'],
                    $row['registered_at']
                ]);
            }
            fclose($output);
            exit();
        }

        sendJsonResponse(true, 'Registrations retrieved', $registrations);
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}

// 2. PATCH/PUT: Update registration status (e.g. mark attendance)
if ($method === 'PATCH' || $method === 'PUT') {
    $input = getJsonInput();
    $id = intval($_GET['id'] ?? ($input['id'] ?? 0));
    $status = $input['status'] ?? 'confirmed';

    if (!$id) sendJsonResponse(false, 'Registration ID required', null, 400);

    if (!$pdo) sendJsonResponse(true, 'Status updated (simulated)');

    try {
        $stmt = $pdo->prepare("UPDATE event_registrations SET status = :status WHERE id = :id");
        $stmt->execute([':status' => $status, ':id' => $id]);
        sendJsonResponse(true, 'Attendance/Status updated successfully');
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}

// 3. DELETE: Remove registration
if ($method === 'DELETE') {
    $id = intval($_GET['id'] ?? 0);
    if (!$id) sendJsonResponse(false, 'Registration ID required', null, 400);

    if (!$pdo) sendJsonResponse(true, 'Registration deleted (simulated)');

    try {
        $stmt = $pdo->prepare("DELETE FROM event_registrations WHERE id = :id");
        $stmt->execute([':id' => $id]);
        sendJsonResponse(true, 'Registration removed successfully');
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}
