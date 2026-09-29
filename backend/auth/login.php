<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/jwt_helper.php';

initCors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(false, 'Method not allowed', null, 405);
}

$input = getJsonInput();
$username = trim($input['username'] ?? '');
$password = trim($input['password'] ?? '');

if (empty($username) || empty($password)) {
    sendJsonResponse(false, 'Username and password are required', null, 400);
}

$db = Database::getInstance();
if (!$db->isConnected()) {
    // Fallback for demonstration when MySQL server is not running locally
    if (($username === 'admin' || $username === 'ecell@davjalandhar.ac.in') && $password === 'admin123') {
        $token = AuthToken::generate([
            'id' => 1,
            'username' => 'admin',
            'full_name' => 'E-Cell Administrator',
            'role' => 'super_admin'
        ]);
        sendJsonResponse(true, 'Login successful', [
            'token' => $token,
            'user' => [
                'id' => 1,
                'username' => 'admin',
                'full_name' => 'E-Cell Administrator',
                'role' => 'super_admin'
            ]
        ]);
    }
    sendJsonResponse(false, 'Invalid credentials', null, 401);
}

$pdo = $db->getConnection();
$stmt = $pdo->prepare('SELECT id, username, email, password_hash, full_name, role, is_active FROM admins WHERE username = :username OR email = :email LIMIT 1');
$stmt->execute([':username' => $username, ':email' => $username]);
$admin = $stmt->fetch();

if (!$admin || !password_verify($password, $admin['password_hash'])) {
    sendJsonResponse(false, 'Invalid username or password', null, 401);
}

if (!$admin['is_active']) {
    sendJsonResponse(false, 'Account is disabled. Please contact system admin.', null, 403);
}

$token = AuthToken::generate([
    'id' => $admin['id'],
    'username' => $admin['username'],
    'email' => $admin['email'],
    'full_name' => $admin['full_name'],
    'role' => $admin['role']
]);

sendJsonResponse(true, 'Login successful', [
    'token' => $token,
    'user' => [
        'id' => $admin['id'],
        'username' => $admin['username'],
        'email' => $admin['email'],
        'full_name' => $admin['full_name'],
        'role' => $admin['role']
    ]
]);
