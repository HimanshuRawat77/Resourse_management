# CampusSpace — University Resource Management System

A small university portal for reserving shared spaces. Students submit requests, administrators approve or reject them, and users see the decision in the app.

## Features

- Registration and login with bcrypt password hashing and JWT authentication.
- Browse exactly three resource types: Auditorium, Library Hall, and Multipurpose Hall.
- Check availability, submit a booking, view and cancel own bookings.
- Admin resource management and booking decisions.
- In-app decision notifications.
- Plain Java LLD demo for OOP, Factory, Strategy, and Observer.

## Stack and architecture

- **Client:** React, Vite, Tailwind CSS, React Router, Axios, Lucide React.
- **Server:** Node.js, Express, MySQL, JWT, bcryptjs.
- **LLD:** Plain Java 17+; no framework.

```text
React / Axios → Express controller → service → repository → MySQL
```

See `docs/architecture.md`, `docs/diagrams/`, and the other viva-friendly notes in `docs/`.

## Project structure

```text
client/       React application
server/       Express API (controllers, services, repositories, middleware)
lld/          Plain Java in-memory design demonstration
database/     MySQL schema and seed note
docs/         Requirements, use cases, API, design notes and Mermaid diagrams
```

## Requirements

- Node.js 20 or newer and npm.
- MySQL 8 (or compatible MySQL server).
- Java 17 or newer to run the LLD demo.

## Setup

1. Create a MySQL database and tables by running `database/schema.sql` in MySQL Workbench or the MySQL CLI:

   ```sh
   mysql -u root -p < database/schema.sql
   ```

2. Copy `.env.example` to `server/.env` and set database credentials and a long random `JWT_SECRET`. The server loads its environment from its working directory.

   ```sh
   cp .env.example server/.env
   ```

3. Seed the demo users and resources:

   ```sh
   npm install --prefix server
   npm run seed --prefix server
   ```

4. Start the API in one terminal:

   ```sh
   npm run dev --prefix server
   ```

   Health check: `http://localhost:5000/api/health`.

5. Start the client in another terminal:

   ```sh
   npm install --prefix client
   npm run dev --prefix client
   ```

   Open `http://localhost:5173`. To use another API URL, set `VITE_API_URL` before starting Vite.

## Demo credentials and flow

Seeded credentials:

| Role | Email | Password |
|---|---|---|
| User | `student@university.com` | `student123` |
| Admin | `admin@university.com` | `admin123` |

Create a future booking for Main Auditorium, purpose **Annual Dance Competition**, 350 attendees. Check availability, submit, sign in as admin and approve it, then sign in as the student to see the approved booking and notification. A second overlapping request for the same resource is rejected with HTTP 409. See `docs/demo-flow.md`.

## API overview

Authentication: `POST /api/auth/register`, `POST /api/auth/login`.

Resources: `GET /api/resources`, `GET /api/resources/:id`, `GET /api/resources/:id/schedule?date=YYYY-MM-DD`; admin `POST /api/resources`, `PUT /api/resources/:id`, `DELETE /api/resources/:id`. Cards summarize current and next bookings; the schedule page shows active reservations chronologically for a selected date.

Bookings: authenticated `POST /api/bookings/availability`, `POST /api/bookings`, `GET /api/bookings/my`, `PATCH /api/bookings/:id/cancel`.

Admin bookings: `GET /api/admin/bookings`, `PATCH /api/admin/bookings/:id/approve`, `PATCH /api/admin/bookings/:id/reject`.

Notifications: `GET /api/notifications`, `PATCH /api/notifications/:id/read`.

Protected requests use `Authorization: Bearer <JWT>`. Full request/response behavior is in `docs/api.md`.

## Java LLD demo

Compile and run from the project root:

```sh
mkdir -p /tmp/urms-classes
javac -d /tmp/urms-classes $(find lld/src -name '*.java')
java -cp /tmp/urms-classes Main
```

The demo creates a resource with the Factory, uses a `Resource` reference polymorphically, validates through a Strategy, creates a booking through a repository interface, and emits an in-memory notification through an Observer.

## Design and database notes

- Patterns: Factory (`ResourceFactory`), Strategy (`BookingStrategy` implementations), Observer (`BookingObserver` / `NotificationObserver`).
- SOLID and OOP mappings: `docs/solid.md`, `docs/oop-design.md`.
- Database tables and indexes: `database/schema.sql`; seed logic uses bcrypt in `server/seed/seed.js`.
- Booking overlap uses `newStart < existingEnd AND newEnd > existingStart`. Pending and approved reservations block time; adjacent reservations are allowed.
- The client availability check is for quick feedback; the server repeats validation when a booking is created.

## Testing checklist

See `docs/error-handling.md` for authentication, resource, booking conflict, status transition, and authorization cases. The Java demo and client production bundle can be verified with the commands above and `npm run build --prefix client`.
