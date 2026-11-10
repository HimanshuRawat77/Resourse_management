# REST API

Success responses use `{ "success": true, "data": ... }`; errors use `{ "success": false, "message": ... }`. Protected endpoints require `Authorization: Bearer <token>`.

| Method | Path | Access | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create USER and return token |
| POST | `/api/auth/login` | Public | Verify credentials and return token |
| GET | `/api/resources` | Public | List resources |
| GET | `/api/resources/:id` | Public | Read resource |
| GET | `/api/resources/:id/schedule?date=YYYY-MM-DD` | Public | List that date's PENDING/APPROVED bookings in time order |
| POST/PUT/DELETE | `/api/resources[/:id]` | ADMIN | Manage resource |
| POST | `/api/bookings/availability` | Signed in | Check time window |
| POST | `/api/bookings` | USER | Create pending booking |
| GET | `/api/bookings/my` | Signed in | List own bookings |
| PATCH | `/api/bookings/:id/cancel` | Signed in | Cancel own booking |
| GET | `/api/admin/bookings` | ADMIN | List all bookings |
| PATCH | `/api/admin/bookings/:id/approve` | ADMIN | Approve pending request |
| PATCH | `/api/admin/bookings/:id/reject` | ADMIN | Reject pending request |
| GET | `/api/notifications` | Signed in | List own notifications |
| PATCH | `/api/notifications/:id/read` | Signed in | Mark own notification read |

See endpoint examples in the root README. Status codes: 400 validation, 401 authentication, 403 authorization, 404 missing record, 409 conflict/invalid transition, 500 unexpected server/database error.
