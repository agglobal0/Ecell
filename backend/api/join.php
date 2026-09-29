<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';

initCors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(false, 'Method not allowed', null, 405);
}

$input = getJsonInput();

$full_name = trim($input['full_name'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? '');
$college = trim($input['college'] ?? 'DAV College Jalandhar');
$course = trim($input['course'] ?? '');
$semester_year = trim($input['semester_year'] ?? '');
$student_id = trim($input['student_id'] ?? '');
$department_interest = trim($input['department_interest'] ?? '');
$why_join = trim($input['why_join'] ?? '');
$past_experience = trim($input['past_experience'] ?? '');
$linkedin_url = trim($input['linkedin_url'] ?? '');

// Validation
if (empty($full_name) || empty($email) || empty($phone) || empty($course) || empty($semester_year) || empty($department_interest) || empty($why_join)) {
    sendJsonResponse(false, 'Please fill in all required fields (Name, Email, Phone, Course, Year, Preferred Wing, Statement of Purpose).', null, 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendJsonResponse(false, 'Please provide a valid email address.', null, 400);
}

// Generate unique application ID: ECELL-JOIN-2026-XXXXX
$randomNum = str_pad(rand(100, 99999), 5, '0', STR_PAD_LEFT);
$app_code = 'ECELL-JOIN-' . date('Y') . '-' . $randomNum;

$db = Database::getInstance();
$pdo = $db->getConnection();

if (!$pdo) {
    // Simulated offline/demo mode response
    sendJsonResponse(true, 'Membership application submitted successfully!', [
        'app_code' => $app_code,
        'full_name' => $full_name,
        'email' => $email,
        'phone' => $phone,
        'college' => $college,
        'course' => $course,
        'semester_year' => $semester_year,
        'department_interest' => $department_interest,
        'status' => 'pending',
        'applied_at' => date('Y-m-d H:i:s')
    ]);
}

try {
    // Check for duplicate application by email
    $chkStmt = $pdo->prepare("SELECT id, app_code FROM member_applications WHERE email = :email LIMIT 1");
    $chkStmt->execute([':email' => $email]);
    $existing = $chkStmt->fetch();

    if ($existing) {
        sendJsonResponse(false, "You have already applied for E-Cell DAV membership with Application ID: " . $existing['app_code'], [
            'app_code' => $existing['app_code']
        ], 409);
    }

    // Ensure App Code is unique
    $codeStmt = $pdo->prepare("SELECT id FROM member_applications WHERE app_code = :app_code");
    $codeStmt->execute([':app_code' => $app_code]);
    while ($codeStmt->fetch()) {
        $randomNum = str_pad(rand(100, 99999), 5, '0', STR_PAD_LEFT);
        $app_code = 'ECELL-JOIN-' . date('Y') . '-' . $randomNum;
        $codeStmt->execute([':app_code' => $app_code]);
    }

    // Insert membership application
    $insStmt = $pdo->prepare("INSERT INTO member_applications 
        (app_code, full_name, email, phone, college, course, semester_year, student_id, department_interest, why_join, past_experience, linkedin_url, status) 
        VALUES (:app_code, :full_name, :email, :phone, :college, :course, :semester_year, :student_id, :department_interest, :why_join, :past_experience, :linkedin_url, 'pending')");

    $insStmt->execute([
        ':app_code' => $app_code,
        ':full_name' => $full_name,
        ':email' => $email,
        ':phone' => $phone,
        ':college' => $college,
        ':course' => $course,
        ':semester_year' => $semester_year,
        ':student_id' => $student_id,
        ':department_interest' => $department_interest,
        ':why_join' => $why_join,
        ':past_experience' => $past_experience,
        ':linkedin_url' => $linkedin_url
    ]);

    sendJsonResponse(true, 'Membership application submitted successfully! Welcome to E-Cell DAV.', [
        'app_code' => $app_code,
        'full_name' => $full_name,
        'email' => $email,
        'phone' => $phone,
        'college' => $college,
        'course' => $course,
        'semester_year' => $semester_year,
        'department_interest' => $department_interest,
        'status' => 'pending',
        'applied_at' => date('Y-m-d H:i:s')
    ]);

} catch (PDOException $e) {
    sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
}
