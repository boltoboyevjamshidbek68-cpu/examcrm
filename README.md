# NestJS CRM (TypeScript) - Backend

Bu ZIP faqat backend uchun tayyorlangan NestJS + TypeScript loyihasidir, Figma loyihangiz (CRM Panel) asosida.

Server API'lari:
- POST /auth/login
- POST /users
- GET /users
- POST /crm/clients
- GET /crm/clients
- GET /crm/clients/:id
- POST /crm/deals
- GET /crm/deals

Ishga tushirish:
1. .env faylini to'ldiring
2. npm install
3. npm run start:dev


## Run with Docker

1. Copy `.env.example` to `.env` and adjust if needed.
2. Run `docker-compose up --build`.
3. Backend will be available at `http://localhost:3000`, Swagger at `http://localhost:3000/api/docs`.

## Local (no Docker)

1. Install deps: `npm ci`
2. Create Postgres DB and set env vars (see `.env`)
3. Run migrations or use `synchronize: true` for dev
4. Start: `npm run start:dev`

## Seeding

Run `npm run seed` to seed admin user and sample data.
