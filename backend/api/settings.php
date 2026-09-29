<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/jwt_helper.php';

initCors();

$db = Database::getInstance();
$pdo = $db->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

// GET: All settings & social links
if ($method === 'GET') {
    if (!$pdo) {
        sendJsonResponse(true, 'Settings (simulated)', [
            'settings' => [
                'site_name' => 'E-CELL DAV JALANDHAR',
                'site_tagline' => 'Ideas Into Impact.',
                'hero_subtext' => 'Empowering students to think beyond classrooms, build meaningful ideas, and explore the world of entrepreneurship.',
                'contact_email' => 'ecell@davjalandhar.ac.in',
                'contact_phone' => '+91 181 225 5641',
                'college_address' => 'DAV College, Mahatma Hans Raj Marg, Dayanand Nagar, Jalandhar, Punjab 144008',
                'instagram_handle' => '@ecell_dav_jalandhar',
                'instagram_url' => 'https://instagram.com/ecell_dav_jalandhar',
                'linkedin_url' => 'https://linkedin.com/company/ecell-dav-jalandhar',
                'youtube_url' => 'https://youtube.com/@ecelldavjalandhar',
                'enable_registrations' => '1'
            ],
            'social_links' => [
                ['platform' => 'Instagram', 'url' => 'https://instagram.com/ecell_dav_jalandhar', 'handle' => '@ecell_dav_jalandhar'],
                ['platform' => 'LinkedIn', 'url' => 'https://linkedin.com/company/ecell-dav-jalandhar', 'handle' => 'E-Cell DAV Jalandhar'],
                ['platform' => 'YouTube', 'url' => 'https://youtube.com/@ecelldavjalandhar', 'handle' => 'E-Cell DAV Media']
            ]
        ]);
    }

    try {
        $settingsStmt = $pdo->query("SELECT setting_key, setting_value FROM site_settings");
        $rawSettings = $settingsStmt->fetchAll();
        $settings = [];
        foreach ($rawSettings as $row) {
            $settings[$row['setting_key']] = $row['setting_value'];
        }

        $socialStmt = $pdo->query("SELECT * FROM social_links WHERE is_active = 1 ORDER BY display_order ASC");
        $socials = $socialStmt->fetchAll();

        sendJsonResponse(true, 'Settings retrieved', [
            'settings' => $settings,
            'social_links' => $socials
        ]);
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}

// POST/PUT: Update settings (Admin only)
if ($method === 'POST' || $method === 'PUT') {
    AuthToken::requireAdmin();
    $input = getJsonInput();

    if (!$pdo) sendJsonResponse(true, 'Settings updated (simulated)');

    try {
        if (isset($input['settings']) && is_array($input['settings'])) {
            $stmt = $pdo->prepare("INSERT INTO site_settings (setting_key, setting_value) VALUES (:key, :val) ON DUPLICATE KEY UPDATE setting_value = :val");
            foreach ($input['settings'] as $k => $v) {
                $stmt->execute([':key' => $k, ':val' => (string)$v]);
            }
        }

        if (isset($input['social_links']) && is_array($input['social_links'])) {
            foreach ($input['social_links'] as $item) {
                if (!empty($item['platform'])) {
                    $sStmt = $pdo->prepare("INSERT INTO social_links (platform, url, handle, icon_name, is_active, display_order) 
                        VALUES (:platform, :url, :handle, :icon_name, :is_active, :display_order)
                        ON DUPLICATE KEY UPDATE url = :url, handle = :handle, is_active = :is_active");
                    $sStmt->execute([
                        ':platform' => $item['platform'],
                        ':url' => $item['url'] ?? '',
                        ':handle' => $item['handle'] ?? '',
                        ':icon_name' => $item['icon_name'] ?? 'Globe',
                        ':is_active' => isset($item['is_active']) ? (int)$item['is_active'] : 1,
                        ':display_order' => (int)($item['display_order'] ?? 0)
                    ]);
                }
            }
        }

        sendJsonResponse(true, 'Settings saved successfully');
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}
