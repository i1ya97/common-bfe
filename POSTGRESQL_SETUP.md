# Настройка PostgreSQL

## Установка PostgreSQL

### Windows
1. Скачайте PostgreSQL с официального сайта: https://www.postgresql.org/download/windows/
2. Установите PostgreSQL с настройками по умолчанию
3. Запомните пароль для пользователя `postgres`

### macOS
```bash
# Используя Homebrew
brew install postgresql
brew services start postgresql
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

## Создание базы данных

1. Подключитесь к PostgreSQL:
```bash
psql -U postgres
```

2. Создайте базу данных:
```sql
CREATE DATABASE common_bfe;
```

3. Создайте пользователя (опционально):
```sql
CREATE USER your_username WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE common_bfe TO your_username;
```

## Настройка переменных окружения

1. Скопируйте файл `env.example` в `.env`:
```bash
cp env.example .env
```

2. Отредактируйте файл `.env` и укажите ваши настройки PostgreSQL:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=common_bfe
DB_USER=postgres
DB_PASSWORD=your-postgres-password
DB_SSL=false
```

## Запуск приложения

После настройки базы данных и переменных окружения:

```bash
pnpm install
pnpm run dev
```

Приложение автоматически:
- Проверит подключение к PostgreSQL
- Создаст необходимые таблицы (`users` и `products`)
- Создаст индексы для оптимизации

## Структура базы данных

### Таблица users
- `id` - SERIAL PRIMARY KEY
- `email` - VARCHAR(255) UNIQUE NOT NULL
- `password` - VARCHAR(255) NOT NULL
- `created_at` - TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- `updated_at` - TIMESTAMP DEFAULT CURRENT_TIMESTAMP

### Таблица products
- `id` - SERIAL PRIMARY KEY
- `name` - VARCHAR(255) NOT NULL
- `price` - DECIMAL(10,2) NOT NULL
- `description` - TEXT
- `created_at` - TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- `updated_at` - TIMESTAMP DEFAULT CURRENT_TIMESTAMP

## API Endpoints

После интеграции с PostgreSQL доступны следующие операции:

### Пользователи
- `GET /users` - получить всех пользователей
- `GET /users/:id` - получить пользователя по ID
- `POST /users` - создать пользователя
- `PUT /users/:id` - обновить пользователя
- `DELETE /users/:id` - удалить пользователя

### Продукты
- `GET /products` - получить все продукты
- `GET /products/:id` - получить продукт по ID
- `GET /products/search?name=keyword` - поиск продуктов по имени
- `POST /products` - создать продукт
- `PUT /products/:id` - обновить продукт
- `DELETE /products/:id` - удалить продукт
