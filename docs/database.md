# Database schema

The MySQL schema is in `database/schema.sql`. It creates exactly four application tables: `users`, `resources`, `bookings`, and `notifications`.

- `users.id` is the primary key; email is unique.
- `resources.id` is the primary key; type is restricted to the three supported types.
- `bookings.id` is the primary key. `user_id` and `resource_id` are foreign keys. Indexes cover `(resource_id,start_time,end_time)`, `user_id`, and `status`.
- `notifications.id` is the primary key and `user_id` references users.

Relationship cardinalities: one user to many bookings; one resource to many bookings; one user to many notifications. Deleting a referenced resource is blocked to preserve booking history.

The overlap query is `existing.start_time < new.end_time AND existing.end_time > new.start_time`, limited to PENDING and APPROVED bookings. Equality at an endpoint is therefore allowed.
