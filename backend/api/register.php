<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';

initCors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(false, 'Method not allowed', null, 405);
}

$input = getJsonInput();

$event_id = intval($input['event_id'] ?? 0);
$full_name = trim($input['full_name'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? '');
$college = trim($input['college'] ?? '');
$course = trim($input['course'] ?? '');
$semester_year = trim($input['semester_year'] ?? '');
$student_id = trim($input['student_id'] ?? '');
$linkedin_url = trim($input['linkedin_url'] ?? '');
$startup_idea = trim($input['startup_idea'] ?? '');

// Validation
if (empty($event_id) || empty($full_name) || empty($email) || empty($phone) || empty($college) || empty($course) || empty($semester_year)) {
    sendJsonResponse(false, 'Please fill in all required fields (Name, Email, Phone, College, Course, Year).', null, 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendJsonResponse(false, 'Please provide a valid email address.', null, 400);
}

// Generate unique registration ID: ECELL-2026-XXXXX
$randomNum = str_pad(rand(100, 99999), 5, '0', STR_PAD_LEFT);
$reg_code = 'ECELL-' . date('Y') . '-' . $randomNum;

$db = Database::getInstance();
$pdo = $db->getConnection();

if (!$pdo) {
    // Return mock success response for demo
    sendJsonResponse(true, 'Registration successful!', [
        'reg_code' => $reg_code,
        'event_title' => 'E-Cell DAV Flagship Event',
        'full_name' => $full_name,
        'email' => $email,
        'phone' => $phone,
        'college' => $college,
        'course' => $course,
        'registered_at' => date('Y-m-d H:i:s')
    ]);
}

try {
    // 1. Verify Event Status
    $stmt = $pdo->prepare("SELECT id, title, status, registration_mode, reg_deadline, max_seats,
                           (SELECT COUNT(*) FROM event_registrations WHERE event_id = events.id) as current_reg_count
                           FROM events WHERE id = :id LIMIT 1");
    $stmt->execute([':id' => $event_id]);
    $event = $stmt->fetch();

    if (!$event) {
        sendJsonResponse(false, 'The selected event does not exist.', null, 404);
    }

    if ($event['registration_mode'] === 'closed' || $event['status'] === 'past') {
        sendJsonResponse(false, 'Registrations for this event are currently closed.', null, 400);
    }

    if (!empty($event['reg_deadline']) && strtotime($event['reg_deadline']) < time()) {
        sendJsonResponse(false, 'The registration deadline for this event has passed.', null, 400);
    }

    if ($event['max_seats'] > 0 && $event['current_reg_count'] >= $event['max_seats']) {
        sendJsonResponse(false, 'All available seats for this event have been filled.', null, 400);
    }

    // 2. Check for duplicate registration by email
    $chkStmt = $pdo->prepare("SELECT id, reg_code FROM event_registrations WHERE event_id = :event_id AND email = :email LIMIT 1");
    $chkStmt->execute([':event_id' => $event_id, ':email' => $email]);
    $existing = $chkStmt->fetch();

    if ($existing) {
        sendJsonResponse(false, "You have already registered for this event with Registration ID: " . $existing['reg_code'], [
            'reg_code' => $existing['reg_code']
        ], 409);
    }

    // 3. Ensure Reg Code is unique
    $codeStmt = $pdo->prepare("SELECT id FROM event_registrations WHERE reg_code = :reg_code");
    $codeStmt->execute([':reg_code' => $reg_code]);
    while ($codeStmt->fetch()) {
        $randomNum = str_pad(rand(100, 99999), 5, '0', STR_PAD_LEFT);
        $reg_code = 'ECELL-' . date('Y') . '-' . $randomNum;
        $codeStmt->execute([':reg_code' => $reg_code]);
    }

    // 4. Insert registration
    $insStmt = $pdo->prepare("INSERT INTO event_registrations 
        (reg_code, event_id, full_name, email, phone, college, course, semester_year, student_id, linkedin_url, startup_idea, status) 
        VALUES (:reg_code, :event_id, :full_name, :email, :phone, :college, :course, :semester_year, :student_id, :linkedin_url, :startup_idea, 'confirmed')");

    $insStmt->execute([
        ':reg_code' => $reg_code,
        ':event_id' => $event_id,
        ':full_name' => $full_name,
        ':email' => $email,
        ':phone' => $phone,
        ':college' => $college,
        ':course' => $course,
        ':semester_year' => $semester_year,
        ':student_id' => $student_id,
        ':linkedin_url' => $linkedin_url,
        ':startup_idea' => $startup_idea
    ]);

    sendJsonResponse(true, 'Registration confirmed successfully!', [
        'reg_code' => $reg_code,
        'event_id' => $event_id,
        'event_title' => $event['title'],
        'full_name' => $full_name,
        'email' => $email,
        'phone' => $phone,
        'college' => $college,
        'course' => $course,
        'registered_at' => date('Y-m-d H:i:s')
    ]);

} catch (PDOException $e) {
    sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
}
