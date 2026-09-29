<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/jwt_helper.php';

initCors();

$db = Database::getInstance();
$pdo = $db->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (!$pdo) sendJsonResponse(true, 'Achievements fetched (simulated)', []);
    try {
        $stmt = $pdo->query("SELECT * FROM achievements ORDER BY display_order ASC, id DESC");
        sendJsonResponse(true, 'Achievements retrieved', $stmt->fetchAll());
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}

if ($method === 'POST') {
    AuthToken::requireAdmin();
    $input = getJsonInput();

    $title = trim($input['title'] ?? '');
    $description = trim($input['description'] ?? '');
    $achievement_date = trim($input['achievement_date'] ?? date('F Y'));
    $category = trim($input['category'] ?? 'Competition');
    $image_url = trim($input['image_url'] ?? '');
    $proof_link = trim($input['proof_link'] ?? '');
    $is_featured = !empty($input['is_featured']) ? 1 : 0;
    $display_order = intval($input['display_order'] ?? 0);

    if (empty($title) || empty($description)) {
        sendJsonResponse(false, 'Title and description are required', null, 400);
    }

    if (!$pdo) sendJsonResponse(true, 'Achievement added (simulated)', ['id' => rand(10, 999)]);

    try {
        $stmt = $pdo->prepare("INSERT INTO achievements (title, description, achievement_date, category, image_url, proof_link, is_featured, display_order) VALUES (:title, :description, :achievement_date, :category, :image_url, :proof_link, :is_featured, :display_order)");
        $stmt->execute([
            ':title' => $title,
            ':description' => $description,
            ':achievement_date' => $achievement_date,
            ':category' => $category,
            ':image_url' => $image_url,
            ':proof_link' => $proof_link,
            ':is_featured' => $is_featured,
            ':display_order' => $display_order
        ]);
        sendJsonResponse(true, 'Achievement created successfully', ['id' => $pdo->lastInsertId()]);
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
        $stmt = $pdo->prepare("DELETE FROM achievements WHERE id = :id");
        $stmt->execute([':id' => $id]);
        sendJsonResponse(true, 'Achievement deleted successfully');
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}
