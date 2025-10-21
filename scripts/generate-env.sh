#!/bin/sh

# Скрипт для генерации .env файла из переменных окружения
# Используется внутри Docker контейнера

echo "# Generated .env file from environment variables" > /app/.env
echo "# Generated at: $(date)" >> /app/.env
echo "" >> /app/.env

# Аутентификация
if [ ! -z "$AUTH_URL" ]; then
    echo "AUTH_URL=$AUTH_URL" >> /app/.env
fi

if [ ! -z "$REALM" ]; then
    echo "REALM=$REALM" >> /app/.env
fi

if [ ! -z "$CLIENT_ID" ]; then
    echo "CLIENT_ID=$CLIENT_ID" >> /app/.env
fi

if [ ! -z "$CLIENT_SECRET" ]; then
    echo "CLIENT_SECRET=$CLIENT_SECRET" >> /app/.env
fi

echo "" >> /app/.env

# Конфигурация приложения
if [ ! -z "$NODE_ENV" ]; then
    echo "NODE_ENV=$NODE_ENV" >> /app/.env
fi

if [ ! -z "$PORT" ]; then
    echo "PORT=$PORT" >> /app/.env
fi

echo "" >> /app/.env

# База данных
if [ ! -z "$DB_HOST" ]; then
    echo "DB_HOST=$DB_HOST" >> /app/.env
fi

if [ ! -z "$DB_PORT" ]; then
    echo "DB_PORT=$DB_PORT" >> /app/.env
fi

if [ ! -z "$DB_NAME" ]; then
    echo "DB_NAME=$DB_NAME" >> /app/.env
fi

if [ ! -z "$DB_USER" ]; then
    echo "DB_USER=$DB_USER" >> /app/.env
fi

if [ ! -z "$DB_PASSWORD" ]; then
    echo "DB_PASSWORD=$DB_PASSWORD" >> /app/.env
fi

if [ ! -z "$DB_SSL" ]; then
    echo "DB_SSL=$DB_SSL" >> /app/.env
else
    echo "DB_SSL=false" >> /app/.env
fi

echo "✅ .env file generated successfully"
echo "📄 Contents:"
cat /app/.env
