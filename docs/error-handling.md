# Validation and error handling

The backend returns a consistent JSON error envelope and passes async route errors to one error middleware. Validation includes required auth fields, unique email, resource type/capacity/status, resource existence and availability, start-before-end, future time, positive attendees within capacity, non-empty purpose, overlap, booking ownership, and valid state transitions.

Expected status codes: 400 bad input; 401 missing/invalid credentials; 403 insufficient role or ownership; 404 missing record; 409 duplicate/conflict/invalid transition; 500 unexpected server or database issue. SQL uses placeholders. A foreign-key restriction prevents deleting a resource with booking history.

## Test checklist

- Auth: register, login, wrong password, duplicate email.
- Resources: list/get; admin create/update/delete; user is denied mutations.
- Booking: valid request; past time; end before start; capacity overflow; overlap; adjacent interval; cancellation; repeated cancellation.
- Admin: approve/reject; reject decision on non-pending state; notification is created.
- Access: missing JWT; user calls admin API; user tries another user's cancellation/notification.
