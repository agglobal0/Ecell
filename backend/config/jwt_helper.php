<?php
// E-Cell DAV Jalandhar - Lightweight JWT & Auth Token Generator

class AuthToken {
    private static $secret = 'ecell_dav_jalandhar_super_secret_jwt_key_2026_!@#';

    public static function generate($payload) {
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload['exp'] = time() + (86400 * 7); // 7 days validity
        $payload['iat'] = time();

        $base64UrlHeader = self::base64UrlEncode($header);
        $base64UrlPayload = self::base64UrlEncode(json_encode($payload));

        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, self::$secret, true);
        $base64UrlSignature = self::base64UrlEncode($signature);

        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    public static function verify($jwt) {
        if (empty($jwt)) return null;

        $tokenParts = explode('.', $jwt);
        if (count($tokenParts) !== 3) return null;

        $header = base64_decode(self::base64UrlDecode($tokenParts[0]));
        $payload = base64_decode(self::base64UrlDecode($tokenParts[1]));
        $signatureProvided = $tokenParts[2];

        // Check expiration
        $payloadObj = json_decode($payload, true);
        if (!$payloadObj || !isset($payloadObj['exp']) || $payloadObj['exp'] < time()) {
            return null;
        }

        // Verify signature
        $base64UrlHeader = self::base64UrlEncode($header);
        $base64UrlPayload = self::base64UrlEncode($payload);
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, self::$secret, true);
        $base64UrlSignature = self::base64UrlEncode($signature);

        if (hash_equals($base64UrlSignature, $signatureProvided)) {
            return $payloadObj;
        }

        return null;
    }

    public static function getBearerToken() {
        $headers = null;
        if (isset($_SERVER['Authorization'])) {
            $headers = trim($_SERVER["Authorization"]);
        } else if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
            if (isset($requestHeaders['Authorization'])) {
                $headers = trim($requestHeaders['Authorization']);
            }
        }

        if (!empty($headers)) {
            if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
                return $matches[1];
            }
        }
        return null;
    }

    public static function requireAdmin() {
        $token = self::getBearerToken();
        if (!$token) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Unauthorized: Missing token']);
            exit();
        }

        $decoded = self::verify($token);
        if (!$decoded) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Unauthorized: Invalid or expired token']);
            exit();
        }

        return $decoded;
    }

    private static function base64UrlEncode($text) {
        return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($text));
    }

    private static function base64UrlDecode($text) {
        $remainder = strlen($text) % 4;
        if ($remainder) {
            $padlen = 4 - $remainder;
            $text .= str_repeat('=', $padlen);
        }
        return strtr($text, '-_', '+/');
    }
}
