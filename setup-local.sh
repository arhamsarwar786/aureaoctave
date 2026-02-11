#!/bin/bash

echo "Setting up Aurea Octave for local development..."

# Create SQLite database file
touch database/database.sqlite

# Update .env file for SQLite
sed -i '' 's|DB_CONNECTION=mysql|DB_CONNECTION=sqlite|g' .env
sed -i '' 's|DB_HOST=mysql|# DB_HOST=mysql|g' .env
sed -i '' 's|DB_PORT=3306|# DB_PORT=3306|g' .env
sed -i '' 's|DB_DATABASE=aureaoctave|# DB_DATABASE=aureaoctave|g' .env
sed -i '' 's|DB_USERNAME=aureaoctave|# DB_USERNAME=aureaoctave|g' .env
sed -i '' 's|DB_PASSWORD=password|# DB_PASSWORD=password|g' .env

# Add SQLite database path
echo "DB_DATABASE=database/database.sqlite" >> .env

echo "Running migrations..."
php artisan migrate

echo "Seeding database..."
php artisan db:seed

echo "Starting development server..."
echo "You can now run: php artisan serve"
echo "The application will be available at: http://localhost:8000"
