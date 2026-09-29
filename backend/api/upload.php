<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/jwt_helper.php';

initCors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(false, 'Method not allowed', null, 405);
}

// Require admin for uploads
AuthToken::requireAdmin();

if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    sendJsonResponse(false, 'No file uploaded or upload error occurred', null, 400);
}

$file = $_FILES['file'];
$maxSize = 5 * 1024 * 1024; // 5 MB

if ($file['size'] > $maxSize) {
    sendJsonResponse(false, 'File size exceeds maximum limit of 5MB', null, 400);
}

// Allowed MIME types and extensions
$allowedMimes = [
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/webp' => 'webp',
    'image/gif' => 'gif',
    'application/pdf' => 'pdf'
];

$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!array_key_exists($mimeType, $allowedMimes)) {
    sendJsonResponse(false, 'Invalid file format. Only JPG, PNG, WEBP, and PDF files are allowed.', null, 400);
}

$ext = $allowedMimes[$mimeType];
$safeFilename = 'upload_' . time() . '_' . bin2hex(random_bytes(8)) . '.' . $ext;

$uploadDir = __DIR__ . '/../uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$targetPath = $uploadDir . $safeFilename;

if (move_uploaded_file($file['tmp_name'], $targetPath)) {
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    $fileUrl = "/backend/uploads/" . $safeFilename;

    sendJsonResponse(true, 'File uploaded successfully', [
        'filename' => $safeFilename,
        'url' => $fileUrl,
        'size' => $file['size'],
        'mime' => $mimeType
    ]);
} else {
    sendJsonResponse(false, 'Failed to save uploaded file', null, 500);
}
