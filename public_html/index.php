<?php

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

if (str_starts_with($_SERVER['REQUEST_URI'] ?? '', '/storage/')) {
    $storagePath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $relativePath = ltrim(substr($storagePath, strlen('/storage/')), '/');

    if (! str_contains($relativePath, '..')) {
        $filePath = realpath(__DIR__ . '/../storage/app/public/' . $relativePath);
        $storageRoot = realpath(__DIR__ . '/../storage/app/public');

        if ($filePath && $storageRoot && str_starts_with($filePath, $storageRoot) && is_file($filePath)) {
            header('Content-Type: ' . (mime_content_type($filePath) ?: 'application/octet-stream'));
            header('Cache-Control: public, max-age=31536000');
            header('Content-Length: ' . filesize($filePath));
            readfile($filePath);
            exit;
        }
    }
}

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
(require_once __DIR__.'/../bootstrap/app.php')
    ->handleRequest(Request::capture());
