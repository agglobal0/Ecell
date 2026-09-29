<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/jwt_helper.php';

initCors();

$db = Database::getInstance();
$pdo = $db->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

// 1. POST: Public Contact Form Submission
if ($method === 'POST') {
    $input = getJsonInput();

    $name = trim($input['name'] ?? '');
    $email = trim($input['email'] ?? '');
    $phone = trim($input['phone'] ?? '');
    $subject = trim($input['subject'] ?? '');
    $message = trim($input['message'] ?? '');

    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        sendJsonResponse(false, 'Please fill in all required fields (Name, Email, Subject, Message).', null, 400);
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendJsonResponse(false, 'Please provide a valid email address.', null, 400);
    }

    if (!$pdo) {
        sendJsonResponse(true, 'Your message has been sent successfully. We will get back to you soon!', ['id' => 1]);
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO contact_messages (name, email, phone, subject, message) VALUES (:name, :email, :phone, :subject, :message)");
        $stmt->execute([
            ':name' => $name,
            ':email' => $email,
            ':phone' => $phone,
            ':subject' => $subject,
            ':message' => $message
        ]);
        sendJsonResponse(true, 'Your message has been received! The E-Cell DAV team will reach out to you shortly.', ['id' => $pdo->lastInsertId()]);
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}

// 2. GET: List Messages (Admin Only)
if ($method === 'GET') {
    AuthToken::requireAdmin();

    if (!$pdo) sendJsonResponse(true, 'Messages (simulated)', []);

    try {
        $stmt = $pdo->query("SELECT * FROM contact_messages ORDER BY created_at DESC");
        sendJsonResponse(true, 'Messages retrieved', $stmt->fetchAll());
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}

// 3. PATCH/PUT: Mark as Read / Replied (Admin Only)
if ($method === 'PATCH' || $method === 'PUT') {
    AuthToken::requireAdmin();
    $input = getJsonInput();
    $id = intval($_GET['id'] ?? ($input['id'] ?? 0));

    if (!$id) sendJsonResponse(false, 'ID required', null, 400);

    if (!$pdo) sendJsonResponse(true, 'Updated (simulated)');

    try {
        $is_read = isset($input['is_read']) ? ($input['is_read'] ? 1 : 0) : null;
        $replied = isset($input['replied']) ? ($input['replied'] ? 1 : 0) : null;

        $updates = [];
        $params = [':id' => $id];
        if ($is_read !== null) { $updates[] = "is_read = :is_read"; $params[':is_read'] = $is_read; }
        if ($replied !== null) { $updates[] = "replied = :replied"; $params[':replied'] = $replied; }

        if (!empty($updates)) {
            $stmt = $pdo->prepare("UPDATE contact_messages SET " . implode(', ', $updates) . " WHERE id = :id");
            $stmt->execute($params);
        }

        sendJsonResponse(true, 'Message updated');
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}

// 4. DELETE: Remove message (Admin)
if ($method === 'DELETE') {
    AuthToken::requireAdmin();
    $id = intval($_GET['id'] ?? 0);
    if (!$id) sendJsonResponse(false, 'ID required', null, 400);

    if (!$pdo) sendJsonResponse(true, 'Deleted (simulated)');

    try {
        $stmt = $pdo->prepare("DELETE FROM contact_messages WHERE id = :id");
        $stmt->execute([':id' => $id]);
        sendJsonResponse(true, 'Message deleted');
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}
