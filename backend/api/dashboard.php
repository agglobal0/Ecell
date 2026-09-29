<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/jwt_helper.php';

initCors();
AuthToken::requireAdmin();

$db = Database::getInstance();
$pdo = $db->getConnection();

if (!$pdo) {
    sendJsonResponse(true, 'Dashboard stats (simulated)', [
        'total_events' => 4,
        'upcoming_events' => 3,
        'total_registrations' => 45,
        'total_members' => 9,
        'total_gallery' => 6,
        'unread_messages' => 2,
        'recent_registrations' => [],
        'recent_messages' => []
    ]);
}

try {
    $eventsCount = $pdo->query("SELECT COUNT(*) FROM events")->fetchColumn();
    $upcomingEventsCount = $pdo->query("SELECT COUNT(*) FROM events WHERE status = 'upcoming'")->fetchColumn();
    $regCount = $pdo->query("SELECT COUNT(*) FROM event_registrations")->fetchColumn();
    $teamCount = $pdo->query("SELECT COUNT(*) FROM team_members WHERE is_active = 1")->fetchColumn();
    $galleryCount = $pdo->query("SELECT COUNT(*) FROM gallery")->fetchColumn();
    $unreadMessages = $pdo->query("SELECT COUNT(*) FROM contact_messages WHERE is_read = 0")->fetchColumn();

    $recentRegs = $pdo->query("SELECT r.*, e.title as event_title FROM event_registrations r JOIN events e ON r.event_id = e.id ORDER BY r.registered_at DESC LIMIT 5")->fetchAll();
    $recentMsgs = $pdo->query("SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 5")->fetchAll();

    sendJsonResponse(true, 'Dashboard overview retrieved', [
        'total_events' => intval($eventsCount),
        'upcoming_events' => intval($upcomingEventsCount),
        'total_registrations' => intval($regCount),
        'total_members' => intval($teamCount),
        'total_gallery' => intval($galleryCount),
        'unread_messages' => intval($unreadMessages),
        'recent_registrations' => $recentRegs,
        'recent_messages' => $recentMsgs
    ]);
} catch (PDOException $e) {
    sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
}
