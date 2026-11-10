package strategy;
import model.Booking; import model.Resource;
public class LibraryBookingStrategy implements BookingStrategy { public boolean validate(Booking b,Resource r){return b.getExpectedAttendees()>0&&b.getExpectedAttendees()<=r.getCapacity()&&b.getStartTime().isBefore(b.getEndTime());} }
