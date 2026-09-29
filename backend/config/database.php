<?php
// E-Cell DAV Jalandhar - Database Connection Handler

class Database {
    private static $instance = null;
    private $pdo;
    private $isConnected = false;

    private function __construct() {
        // Load env variables if present or use standard defaults
        $host = getenv('DB_HOST') ?: '127.0.0.1';
        $port = getenv('DB_PORT') ?: '3306';
        $db   = getenv('DB_NAME') ?: 'ecell_dav';
        $user = getenv('DB_USER') ?: 'root';
        $pass = getenv('DB_PASS') !== false ? getenv('DB_PASS') : '';
        $charset = 'utf8mb4';

        $dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        try {
            $this->pdo = new PDO($dsn, $user, $pass, $options);
            $this->isConnected = true;
        } catch (PDOException $e) {
            $this->isConnected = false;
            // In development or when MySQL is not yet configured, provide graceful error
            $this->pdo = null;
        }
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->pdo;
    }

    public function isConnected() {
        return $this->isConnected && $this->pdo !== null;
    }
}
