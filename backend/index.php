<?php
require_once __DIR__ . '/config/cors.php';
require_once __DIR__ . '/config/database.php';

initCors();

$db = Database::getInstance();

sendJsonResponse(true, 'E-Cell DAV Jalandhar API Server is running', [
    'version' => '1.0.0',
    'status' => 'healthy',
    'database_connected' => $db->isConnected(),
    'endpoints' => [
        'events' => '/api/events.php',
        'register' => '/api/register.php',
        'team' => '/api/team.php',
        'gallery' => '/api/gallery.php',
        'achievements' => '/api/achievements.php',
        'resources' => '/api/resources.php',
        'contact' => '/api/contact.php',
        'stats' => '/api/stats.php',
        'settings' => '/api/settings.php',
        'admin_login' => '/auth/login.php',
        'admin_dashboard' => '/api/dashboard.php',
        'admin_registrations' => '/api/registrations.php',
        'upload' => '/api/upload.php'
    ]
]);
