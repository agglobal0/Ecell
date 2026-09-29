<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/jwt_helper.php';

initCors();

$db = Database::getInstance();
$pdo = $db->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

// GET: Homepage stats
if ($method === 'GET') {
    if (!$pdo) {
        sendJsonResponse(true, 'Stats fetched (simulated)', [
            ['id' => 1, 'stat_key' => 'events_conducted', 'label' => 'Events Conducted', 'value_number' => '20', 'suffix' => '+', 'icon_name' => 'Calendar'],
            ['id' => 2, 'stat_key' => 'participants', 'label' => 'Active Participants', 'value_number' => '1500', 'suffix' => '+', 'icon_name' => 'Users'],
            ['id' => 3, 'stat_key' => 'workshops', 'label' => 'Workshops & Bootcamps', 'value_number' => '15', 'suffix' => '+', 'icon_name' => 'Lightbulb'],
            ['id' => 4, 'stat_key' => 'student_projects', 'label' => 'Student Initiatives', 'value_number' => '10', 'suffix' => '+', 'icon_name' => 'Rocket']
        ]);
    }

    try {
        $stmt = $pdo->query("SELECT * FROM homepage_stats WHERE is_active = 1 ORDER BY display_order ASC");
        sendJsonResponse(true, 'Homepage stats retrieved', $stmt->fetchAll());
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}

// POST/PUT: Update stats (Admin only)
if ($method === 'POST' || $method === 'PUT') {
    AuthToken::requireAdmin();
    $input = getJsonInput();

    if (!$pdo) sendJsonResponse(true, 'Stats updated (simulated)');

    try {
        if (isset($input['stats']) && is_array($input['stats'])) {
            foreach ($input['stats'] as $item) {
                $stmt = $pdo->prepare("UPDATE homepage_stats SET label = :label, value_number = :value_number, suffix = :suffix WHERE id = :id");
                $stmt->execute([
                    ':label' => $item['label'],
                    ':value_number' => $item['value_number'],
                    ':suffix' => $item['suffix'] ?? '+',
                    ':id' => $item['id']
                ]);
            }
        }
        sendJsonResponse(true, 'Homepage stats updated successfully');
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}
