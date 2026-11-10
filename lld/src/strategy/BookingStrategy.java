package strategy;
import model.Booking; import model.Resource;
public interface BookingStrategy { boolean validate(Booking booking, Resource resource); }
