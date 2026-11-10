# SOLID in this project

- **Single Responsibility:** `BookingService` owns booking rules; `ResourceService` owns resource validation; `NotificationService` owns notifications; repositories own SQL; controllers own HTTP mapping.
- **Open/Closed:** Java `Resource` and `BookingStrategy` abstractions allow a new resource implementation and strategy to be added without rewriting the booking workflow. The current app deliberately supports the three required types.
- **Liskov Substitution:** `Auditorium`, `LibraryHall`, and `MultipurposeHall` override the `Resource` contract and can be handled as `Resource` references.
- **Interface Segregation:** Java uses focused `BookingRepository`, `ResourceRepository`, `BookingObserver`, and `BookingStrategy` interfaces.
- **Dependency Inversion:** Java `BookingService` accepts a `BookingRepository` abstraction. Services in the Express app import repository modules; for the small practical implementation this is a simpler layer boundary rather than a full DI container.
