<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/jwt_helper.php';

initCors();

$db = Database::getInstance();
$pdo = $db->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

// Helper to sanitize slug
function generateSlug($text) {
    $text = preg_replace('~[^\pL\d]+~u', '-', $text);
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
    $text = preg_replace('~[^-\w]+~', '', $text);
    $text = trim($text, '-');
    $text = preg_replace('~-+~', '-', $text);
    return strtolower($text);
}

// 1. GET Request: List all events or single event
if ($method === 'GET') {
    $id = $_GET['id'] ?? null;
    $slug = $_GET['slug'] ?? null;
    $category = $_GET['category'] ?? null;
    $status = $_GET['status'] ?? null;
    $search = $_GET['search'] ?? null;

    if (!$pdo) {
        // Return demo response if DB is offline
        sendJsonResponse(true, 'Events fetched', [
            'events' => getFallbackEvents($slug, $id),
            'source' => 'static_fallback'
        ]);
    }

    try {
        if ($id || $slug) {
            $sql = "SELECT e.*, 
                    (SELECT COUNT(*) FROM event_registrations WHERE event_id = e.id) as registrations_count 
                    FROM events e WHERE ";
            $params = [];
            if ($id) {
                $sql .= "e.id = :id";
                $params[':id'] = $id;
            } else {
                $sql .= "e.slug = :slug";
                $params[':slug'] = $slug;
            }
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            $event = $stmt->fetch();

            if (!$event) {
                sendJsonResponse(false, 'Event not found', null, 404);
            }

            // Decode JSON fields
            $event['learn_points'] = json_decode($event['learn_points'] ?? '[]', true) ?: [];
            $event['schedule'] = json_decode($event['schedule'] ?? '[]', true) ?: [];
            $event['speakers'] = json_decode($event['speakers'] ?? '[]', true) ?: [];

            sendJsonResponse(true, 'Event details retrieved', $event);
        }

        // List query
        $sql = "SELECT e.*, 
                (SELECT COUNT(*) FROM event_registrations WHERE event_id = e.id) as registrations_count 
                FROM events e WHERE 1=1 ";
        $params = [];

        if (!empty($category) && $category !== 'All') {
            $sql .= " AND e.category = :category";
            $params[':category'] = $category;
        }

        if (!empty($status) && $status !== 'All') {
            $sql .= " AND e.status = :status";
            $params[':status'] = $status;
        }

        if (!empty($search)) {
            $sql .= " AND (e.title LIKE :search OR e.short_description LIKE :search OR e.venue LIKE :search)";
            $params[':search'] = "%$search%";
        }

        $sql .= " ORDER BY e.event_date ASC, e.id DESC";

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $events = $stmt->fetchAll();

        foreach ($events as &$ev) {
            $ev['learn_points'] = json_decode($ev['learn_points'] ?? '[]', true) ?: [];
            $ev['schedule'] = json_decode($ev['schedule'] ?? '[]', true) ?: [];
            $ev['speakers'] = json_decode($ev['speakers'] ?? '[]', true) ?: [];
        }

        sendJsonResponse(true, 'Events retrieved successfully', $events);
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}

// 2. POST Request: Create new event (Admin only)
if ($method === 'POST') {
    AuthToken::requireAdmin();
    $input = getJsonInput();

    $title = trim($input['title'] ?? '');
    if (empty($title)) {
        sendJsonResponse(false, 'Event title is required', null, 400);
    }

    $slug = trim($input['slug'] ?? '') ?: generateSlug($title);
    $category = $input['category'] ?? 'Workshop';
    $poster_url = $input['poster_url'] ?? '';
    $event_date = $input['event_date'] ?? date('Y-m-d');
    $event_time = $input['event_time'] ?? '10:00 AM';
    $venue = $input['venue'] ?? 'DAV College Jalandhar';
    $short_description = $input['short_description'] ?? '';
    $about_details = $input['about_details'] ?? '';
    $learn_points = is_array($input['learn_points'] ?? null) ? json_encode($input['learn_points']) : ($input['learn_points'] ?? '[]');
    $eligibility = $input['eligibility'] ?? 'Open to all students';
    $rules = $input['rules'] ?? '';
    $schedule = is_array($input['schedule'] ?? null) ? json_encode($input['schedule']) : ($input['schedule'] ?? '[]');
    $speakers = is_array($input['speakers'] ?? null) ? json_encode($input['speakers']) : ($input['speakers'] ?? '[]');
    $organizers = $input['organizers'] ?? 'E-Cell Team';
    $reg_deadline = !empty($input['reg_deadline']) ? $input['reg_deadline'] : null;
    $max_seats = intval($input['max_seats'] ?? 100);
    $status = $input['status'] ?? 'upcoming';
    $registration_mode = $input['registration_mode'] ?? 'internal';
    $external_reg_url = $input['external_reg_url'] ?? null;
    $is_featured = !empty($input['is_featured']) ? 1 : 0;

    if (!$pdo) {
        sendJsonResponse(true, 'Event created (simulated mode)', ['id' => rand(10, 999), 'slug' => $slug]);
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO events 
            (slug, title, category, poster_url, event_date, event_time, venue, short_description, about_details, learn_points, eligibility, rules, schedule, speakers, organizers, reg_deadline, max_seats, status, registration_mode, external_reg_url, is_featured) 
            VALUES (:slug, :title, :category, :poster_url, :event_date, :event_time, :venue, :short_description, :about_details, :learn_points, :eligibility, :rules, :schedule, :speakers, :organizers, :reg_deadline, :max_seats, :status, :registration_mode, :external_reg_url, :is_featured)");

        $stmt->execute([
            ':slug' => $slug,
            ':title' => $title,
            ':category' => $category,
            ':poster_url' => $poster_url,
            ':event_date' => $event_date,
            ':event_time' => $event_time,
            ':venue' => $venue,
            ':short_description' => $short_description,
            ':about_details' => $about_details,
            ':learn_points' => $learn_points,
            ':eligibility' => $eligibility,
            ':rules' => $rules,
            ':schedule' => $schedule,
            ':speakers' => $speakers,
            ':organizers' => $organizers,
            ':reg_deadline' => $reg_deadline,
            ':max_seats' => $max_seats,
            ':status' => $status,
            ':registration_mode' => $registration_mode,
            ':external_reg_url' => $external_reg_url,
            ':is_featured' => $is_featured,
        ]);

        sendJsonResponse(true, 'Event created successfully', ['id' => $pdo->lastInsertId(), 'slug' => $slug]);
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}

// 3. PUT Request: Update event (Admin only)
if ($method === 'PUT' || $method === 'PATCH') {
    AuthToken::requireAdmin();
    $input = getJsonInput();
    $id = intval($_GET['id'] ?? ($input['id'] ?? 0));

    if (!$id) {
        sendJsonResponse(false, 'Event ID is required', null, 400);
    }

    if (!$pdo) {
        sendJsonResponse(true, 'Event updated (simulated mode)', ['id' => $id]);
    }

    try {
        $fields = [];
        $params = [':id' => $id];

        $allowed = ['slug', 'title', 'category', 'poster_url', 'event_date', 'event_time', 'venue', 'short_description', 'about_details', 'eligibility', 'rules', 'organizers', 'reg_deadline', 'max_seats', 'status', 'registration_mode', 'external_reg_url', 'is_featured'];
        
        foreach ($allowed as $f) {
            if (isset($input[$f])) {
                $fields[] = "`$f` = :$f";
                $params[":$f"] = $input[$f];
            }
        }

        // Special handling for json fields
        if (isset($input['learn_points'])) {
            $fields[] = "`learn_points` = :learn_points";
            $params[':learn_points'] = is_array($input['learn_points']) ? json_encode($input['learn_points']) : $input['learn_points'];
        }
        if (isset($input['schedule'])) {
            $fields[] = "`schedule` = :schedule";
            $params[':schedule'] = is_array($input['schedule']) ? json_encode($input['schedule']) : $input['schedule'];
        }
        if (isset($input['speakers'])) {
            $fields[] = "`speakers` = :speakers";
            $params[':speakers'] = is_array($input['speakers']) ? json_encode($input['speakers']) : $input['speakers'];
        }

        if (empty($fields)) {
            sendJsonResponse(false, 'No fields provided for update', null, 400);
        }

        $sql = "UPDATE events SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        sendJsonResponse(true, 'Event updated successfully');
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}

// 4. DELETE Request: Remove event (Admin only)
if ($method === 'DELETE') {
    AuthToken::requireAdmin();
    $id = intval($_GET['id'] ?? 0);

    if (!$id) {
        sendJsonResponse(false, 'Event ID is required', null, 400);
    }

    if (!$pdo) {
        sendJsonResponse(true, 'Event deleted (simulated mode)');
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM events WHERE id = :id");
        $stmt->execute([':id' => $id]);
        sendJsonResponse(true, 'Event deleted successfully');
    } catch (PDOException $e) {
        sendJsonResponse(false, 'Database error: ' . $e->getMessage(), null, 500);
    }
}

function getFallbackEvents($slug = null, $id = null) {
    // Structured sample for development preview
    return [];
}
