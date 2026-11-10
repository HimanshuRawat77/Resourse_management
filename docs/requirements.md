# Requirements

## Functional requirements

- A visitor can register as a user and sign in.
- Signed-in users can browse the three university resources and check their availability.
- A user can request a booking with time, purpose, and attendee count, then view or cancel their own bookings.
- An administrator can manage resources and view, approve, or reject pending bookings.
- Users can read their booking notifications.

## Non-functional requirements

- **Security:** bcrypt password hashes, JWT authentication, role checks, and parameterized SQL.
- **Maintainability:** controller → service → repository separation and focused React pages.
- **Reliability:** server-side validation, transaction-protected conflict check, and centralized errors.
- **Usability:** responsive screens, visible status badges, loading/error/empty states.
- **Performance:** indexes support resource, user, and status booking lookups.
- **Basic scalability:** one Express server and a MySQL connection pool are sufficient for a college project.

## Scope and assumptions

There are only USER and ADMIN roles and one university. A booking blocks its interval while PENDING or APPROVED. Adjacent bookings are allowed. Notification delivery is in-app only.
