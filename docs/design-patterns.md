# Design patterns

- **Factory:** `ResourceFactory` centralizes construction of the three resource subclasses. `Main.java` demonstrates it.
- **Strategy:** `BookingService` selects a `BookingStrategy` for a resource type, keeping resource-specific validation replaceable. Current strategies enforce positive attendees, capacity, and a valid interval.
- **Observer:** `BookingService` notifies registered `BookingObserver` objects after an admin decision. `NotificationObserver` delegates notification creation to `NotificationService`.

These patterns solve visible design problems; no extra patterns are added just to increase the count.
