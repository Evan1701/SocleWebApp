#!/bin/sh

echo "⏳ Attente de PostgreSQL à $DB_HOST:$DB_PORT..."

# Attend que PostgreSQL soit prêt
until nc -z "$DB_HOST" "$DB_PORT"; do
  sleep 1
done

echo "✅ PostgreSQL est prêt. Lancement du serveur..."

# Lancer le backend
exec npm run dev