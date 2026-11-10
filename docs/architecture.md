# Architecture

The browser uses React Router pages and an Axios client. The client sends JSON to Express REST routes and includes a JWT for protected requests. Authentication middleware verifies identity; admin middleware checks the role. Controllers translate HTTP requests into service calls, services enforce business rules, and repositories own SQL. MySQL stores users, resources, bookings, and notifications.

```text
React + Axios → Express routes/controllers → Services → Repositories → MySQL
                         │ JWT middleware
                         └ bcrypt password hashing in AuthService
```

Booking validation is repeated on the server even when the UI first checks availability. Creation checks overlapping PENDING/APPROVED requests inside a transaction while holding the resource row lock.

See [architecture diagram](diagrams/architecture.mmd).
