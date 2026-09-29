<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/jwt_helper.php';

initCors();

$db = Database::getInstance();
$pdo = $db->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

// 1. GET: Fetch Team Members
if ($method === 'GET') {
    $category = $_GET['category'] ?? null;
    $leadership = $_GET['leadership'] ?? null;

    if (!$pdo) {
        sendJsonResponse(true, 'Team fetched (simulated)', []);
    }

    try {
        $sql = "SELECT * FROM team_members WHERE is_active = 1 ";
        $params = [];

        if (!empty($category) && $category !== 'All') {
            $sql .= " AND category = :category";
            $params[':category'] = $category;
        }

        if ($leadership === '1' || $leadership === 'true') {
            $sql .= " AND is_leadership = 1";
        }

        $sql .= " ORDER BY display_order ASC, id ASC";

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $members = $stmt->fetchAll();

        sendJsonResponse(true, 'Team members retrieved', $members);
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}

// 2. POST: Add Team Member (Admin)
if ($method === 'POST') {
    AuthToken::requireAdmin();
    $input = getJsonInput();

    $name = trim($input['name'] ?? '');
    $designation = trim($input['designation'] ?? '');
    $department = trim($input['department'] ?? '');
    $category = trim($input['category'] ?? 'Core Team');
    $is_leadership = !empty($input['is_leadership']) ? 1 : 0;
    $bio = trim($input['bio'] ?? '');
    $photo_url = trim($input['photo_url'] ?? '');
    $linkedin_url = trim($input['linkedin_url'] ?? '');
    $instagram_url = trim($input['instagram_url'] ?? '');
    $email = trim($input['email'] ?? '');
    $display_order = intval($input['display_order'] ?? 0);

    if (empty($name) || empty($designation)) {
        sendJsonResponse(false, 'Name and designation are required', null, 400);
    }

    if (!$pdo) {
        sendJsonResponse(true, 'Member added (simulated)', ['id' => rand(10, 999)]);
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO team_members 
            (name, designation, department, category, is_leadership, bio, photo_url, linkedin_url, instagram_url, email, display_order) 
            VALUES (:name, :designation, :department, :category, :is_leadership, :bio, :photo_url, :linkedin_url, :instagram_url, :email, :display_order)");

        $stmt->execute([
            ':name' => $name,
            ':designation' => $designation,
            ':department' => $department,
            ':category' => $category,
            ':is_leadership' => $is_leadership,
            ':bio' => $bio,
            ':photo_url' => $photo_url,
            ':linkedin_url' => $linkedin_url,
            ':instagram_url' => $instagram_url,
            ':email' => $email,
            ':display_order' => $display_order
        ]);

        sendJsonResponse(true, 'Team member added successfully', ['id' => $pdo->lastInsertId()]);
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}

// 3. PUT/PATCH: Update Team Member
if ($method === 'PUT' || $method === 'PATCH') {
    AuthToken::requireAdmin();
    $input = getJsonInput();
    $id = intval($_GET['id'] ?? ($input['id'] ?? 0));

    if (!$id) sendJsonResponse(false, 'Member ID required', null, 400);

    if (!$pdo) sendJsonResponse(true, 'Member updated (simulated)');

    try {
        $fields = [];
        $params = [':id' => $id];
        $allowed = ['name', 'designation', 'department', 'category', 'is_leadership', 'bio', 'photo_url', 'linkedin_url', 'instagram_url', 'email', 'display_order', 'is_active'];

        foreach ($allowed as $f) {
            if (isset($input[$f])) {
                $fields[] = "`$f` = :$f";
                $params[":$f"] = $input[$f];
            }
        }

        if (empty($fields)) sendJsonResponse(false, 'No update fields', null, 400);

        $sql = "UPDATE team_members SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        sendJsonResponse(true, 'Team member updated successfully');
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}

// 4. DELETE: Remove Team Member
if ($method === 'DELETE') {
    AuthToken::requireAdmin();
    $id = intval($_GET['id'] ?? 0);
    if (!$id) sendJsonResponse(false, 'Member ID required', null, 400);

    if (!$pdo) sendJsonResponse(true, 'Member deleted (simulated)');

    try {
        $stmt = $pdo->prepare("DELETE FROM team_members WHERE id = :id");
        $stmt->execute([':id' => $id]);
        sendJsonResponse(true, 'Team member deleted successfully');
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}
