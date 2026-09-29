<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/jwt_helper.php';

initCors();

$db = Database::getInstance();
$pdo = $db->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $category = $_GET['category'] ?? null;
    $type = $_GET['type'] ?? null;

    if (!$pdo) sendJsonResponse(true, 'Resources fetched (simulated)', []);

    try {
        $sql = "SELECT * FROM resources WHERE 1=1 ";
        $params = [];
        if (!empty($category) && $category !== 'All') {
            $sql .= " AND category = :category";
            $params[':category'] = $category;
        }
        if (!empty($type) && $type !== 'All') {
            $sql .= " AND resource_type = :type";
            $params[':type'] = $type;
        }
        $sql .= " ORDER BY is_featured DESC, id DESC";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        sendJsonResponse(true, 'Resources retrieved', $stmt->fetchAll());
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}

if ($method === 'POST') {
    AuthToken::requireAdmin();
    $input = getJsonInput();

    $title = trim($input['title'] ?? '');
    $category = trim($input['category'] ?? 'Entrepreneurship');
    $resource_type = trim($input['resource_type'] ?? 'Guide');
    $file_url = trim($input['file_url'] ?? '');
    $link_url = trim($input['link_url'] ?? '');
    $description = trim($input['description'] ?? '');
    $tags = trim($input['tags'] ?? '');
    $is_featured = !empty($input['is_featured']) ? 1 : 0;

    if (empty($title) || empty($description)) {
        sendJsonResponse(false, 'Title and description are required', null, 400);
    }

    if (!$pdo) sendJsonResponse(true, 'Resource created (simulated)', ['id' => rand(10, 999)]);

    try {
        $stmt = $pdo->prepare("INSERT INTO resources (title, category, resource_type, file_url, link_url, description, tags, is_featured) VALUES (:title, :category, :resource_type, :file_url, :link_url, :description, :tags, :is_featured)");
        $stmt->execute([
            ':title' => $title,
            ':category' => $category,
            ':resource_type' => $resource_type,
            ':file_url' => $file_url,
            ':link_url' => $link_url,
            ':description' => $description,
            ':tags' => $tags,
            ':is_featured' => $is_featured
        ]);
        sendJsonResponse(true, 'Resource created successfully', ['id' => $pdo->lastInsertId()]);
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}

if ($method === 'DELETE') {
    AuthToken::requireAdmin();
    $id = intval($_GET['id'] ?? 0);
    if (!$id) sendJsonResponse(false, 'ID required', null, 400);

    if (!$pdo) sendJsonResponse(true, 'Deleted (simulated)');

    try {
        $stmt = $pdo->prepare("DELETE FROM resources WHERE id = :id");
        $stmt->execute([':id' => $id]);
        sendJsonResponse(true, 'Resource deleted successfully');
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}
