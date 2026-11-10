# Viva demo flow

1. Start MySQL, create the database with `database/schema.sql`, and run the server seed script.
2. Sign in as `student@university.com` / `student123`.
3. Open Resources → Main Auditorium → choose a future date/time, purpose “Annual Dance Competition”, and 350 attendees.
4. Check availability and create booking. Confirm status `PENDING` in My bookings.
5. Sign out and sign in as `admin@university.com` / `admin123`.
6. Open Admin dashboard and approve the request.
7. Return as student. Confirm `APPROVED` and read the approval notification.
8. Try another booking with an overlapping time for the same resource; the API returns 409 and the UI displays the conflict.

Choose a date at least one day ahead so the past-booking rule does not block the demo. Pending requests block overlapping times too.
