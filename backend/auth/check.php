<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/jwt_helper.php';

initCors();

$user = AuthToken::requireAdmin();
sendJsonResponse(true, 'Token is valid', ['user' => $user]);
