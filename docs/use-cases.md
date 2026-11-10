# Actors and use cases

## User

Register, log in, browse resources, check availability, create booking, view own bookings, cancel own pending/approved booking, and view/mark notifications read.

## Admin

Log in, browse and manage resources, view all bookings, approve a pending booking, or reject a pending booking.

## Use-case notes

- A booking request is created in `PENDING` state.
- The booking owner can cancel only their own `PENDING` or `APPROVED` request.
- Admin decisions are valid only from `PENDING`; each decision creates an in-app notification.
- Resource deletion is rejected by the database when booking history references the resource.

See [use-case diagram](diagrams/use-cases.mmd).
