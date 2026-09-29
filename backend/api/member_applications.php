<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/jwt_helper.php';

initCors();
AuthToken::requireAdmin();

$db = Database::getInstance();
$pdo = $db->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

// 1. GET: List member applications, search, filter by department or status, export CSV
if ($method === 'GET') {
    $department = $_GET['department'] ?? null;
    $status = $_GET['status'] ?? null;
    $search = $_GET['search'] ?? null;
    $export = $_GET['export'] ?? null;

    if (!$pdo) sendJsonResponse(true, 'Member applications (simulated)', []);

    try {
        $sql = "SELECT * FROM member_applications WHERE 1=1 ";
        $params = [];

        if (!empty($department) && $department !== 'All') {
            $sql .= " AND department_interest = :department";
            $params[':department'] = $department;
        }

        if (!empty($status) && $status !== 'All') {
            $sql .= " AND status = :status";
            $params[':status'] = $status;
        }

        if (!empty($search)) {
            $sql .= " AND (full_name LIKE :search OR email LIKE :search OR phone LIKE :search OR app_code LIKE :search OR course LIKE :search)";
            $params[':search'] = "%$search%";
        }

        $sql .= " ORDER BY applied_at DESC";

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $applications = $stmt->fetchAll();

        // If CSV export requested
        if ($export === 'csv') {
            header('Content-Type: text/csv; charset=utf-8');
            header('Content-Disposition: attachment; filename=ecell_member_applications_' . date('Y-m-d_His') . '.csv');
            $output = fopen('php://output', 'w');
            fputcsv($output, ['Application ID', 'Candidate Name', 'Email', 'Phone', 'College', 'Course', 'Year', 'Student ID', 'Wing Interest', 'Why Join', 'Past Experience', 'LinkedIn', 'Status', 'Applied At']);
            foreach ($applications as $row) {
                fputcsv($output, [
                    $row['app_code'],
                    $row['full_name'],
                    $row['email'],
                    $row['phone'],
                    $row['college'],
                    $row['course'],
                    $row['semester_year'],
                    $row['student_id'],
                    $row['department_interest'],
                    $row['why_join'],
                    $row['past_experience'],
                    $row['linkedin_url'],
                    $row['status'],
                    $row['applied_at']
                ]);
            }
            fclose($output);
            exit();
        }

        sendJsonResponse(true, 'Applications retrieved', $applications);
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}

// 2. PATCH/PUT: Update application status or add interview notes
if ($method === 'PATCH' || $method === 'PUT') {
    $input = getJsonInput();
    $id = intval($_GET['id'] ?? ($input['id'] ?? 0));
    $status = $input['status'] ?? 'pending';
    $notes = $input['notes'] ?? null;

    if (!$id) sendJsonResponse(false, 'Application ID required', null, 400);

    if (!$pdo) sendJsonResponse(true, 'Status updated (simulated)');

    try {
        $stmt = $pdo->prepare("UPDATE member_applications SET status = :status, notes = COALESCE(:notes, notes) WHERE id = :id");
        $stmt->execute([':status' => $status, ':notes' => $notes, ':id' => $id]);
        sendJsonResponse(true, 'Application status updated successfully');
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}

// 3. DELETE: Remove application
if ($method === 'DELETE') {
    $id = intval($_GET['id'] ?? 0);
    if (!$id) sendJsonResponse(false, 'Application ID required', null, 400);

    if (!$pdo) sendJsonResponse(true, 'Application deleted (simulated)');

    try {
        $stmt = $pdo->prepare("DELETE FROM member_applications WHERE id = :id");
        $stmt->execute([':id' => $id]);
        sendJsonResponse(true, 'Application removed successfully');
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}
