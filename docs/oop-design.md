# OOP design

- **Encapsulation:** Java model fields are private and exposed through methods; capacity rejects invalid values.
- **Abstraction:** `Resource` is abstract and repository/strategy/observer roles are interfaces.
- **Inheritance:** the three concrete resource classes extend `Resource`.
- **Polymorphism:** `Main` stores factory-created subclasses in a `Resource` reference and calls overridden methods.

The Java version is an in-memory LLD demonstration. The working application persists its data in MySQL through Express.
