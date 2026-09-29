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
    $featured = $_GET['featured'] ?? null;

    if (!$pdo) sendJsonResponse(true, 'Gallery fetched (simulated)', []);

    try {
        $sql = "SELECT * FROM gallery WHERE 1=1 ";
        $params = [];

        if (!empty($category) && $category !== 'All') {
            $sql .= " AND category = :category";
            $params[':category'] = $category;
        }

        if ($featured === '1' || $featured === 'true') {
            $sql .= " AND is_featured = 1";
        }

        $sql .= " ORDER BY display_order ASC, id DESC";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        sendJsonResponse(true, 'Gallery images retrieved', $stmt->fetchAll());
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}

if ($method === 'POST') {
    AuthToken::requireAdmin();
    $input = getJsonInput();

    $title = trim($input['title'] ?? '');
    $category = trim($input['category'] ?? 'Events');
    $image_url = trim($input['image_url'] ?? '');
    $event_name = trim($input['event_name'] ?? '');
    $caption = trim($input['caption'] ?? '');
    $is_featured = !empty($input['is_featured']) ? 1 : 0;
    $display_order = intval($input['display_order'] ?? 0);

    if (empty($title) || empty($image_url)) {
        sendJsonResponse(false, 'Title and Image URL are required', null, 400);
    }

    if (!$pdo) sendJsonResponse(true, 'Image added (simulated)', ['id' => rand(10, 999)]);

    try {
        $stmt = $pdo->prepare("INSERT INTO gallery (title, category, image_url, event_name, caption, is_featured, display_order) VALUES (:title, :category, :image_url, :event_name, :caption, :is_featured, :display_order)");
        $stmt->execute([
            ':title' => $title,
            ':category' => $category,
            ':image_url' => $image_url,
            ':event_name' => $event_name,
            ':caption' => $caption,
            ':is_featured' => $is_featured,
            ':display_order' => $display_order
        ]);
        sendJsonResponse(true, 'Gallery item created', ['id' => $pdo->lastInsertId()]);
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}

if ($method === 'DELETE') {
    AuthToken::requireAdmin();
    $id = intval($_GET['id'] ?? 0);
    if (!$id) sendJsonResponse(false, 'ID required', null, 400);

    if (!$pdo) sendJsonResponse(true, 'Image deleted (simulated)');

    try {
        $stmt = $pdo->prepare("DELETE FROM gallery WHERE id = :id");
        $stmt->execute([':id' => $id]);
        sendJsonResponse(true, 'Gallery item removed');
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}
