package service;
import model.*; import repository.BookingRepository; import strategy.*; import observer.BookingObserver; import java.util.*;
public class BookingService {
    private final BookingRepository repository; private final Map<String,BookingStrategy> strategies; private final List<BookingObserver> observers=new ArrayList<>();
    public BookingService(BookingRepository repository){this.repository=repository;this.strategies=Map.of("AUDITORIUM",new AuditoriumBookingStrategy(),"LIBRARY_HALL",new LibraryBookingStrategy(),"MULTIPURPOSE_HALL",new MultipurposeHallBookingStrategy());}
    public void addObserver(BookingObserver observer){observers.add(observer);}
    public Booking create(Booking booking){BookingStrategy strategy=strategies.get(booking.getResource().getType());if(strategy==null||!booking.getResource().isAvailable()||!strategy.validate(booking,booking.getResource()))throw new IllegalArgumentException("Booking details are invalid for this resource.");return repository.save(booking);}
    public void changeStatus(Booking booking,String status){if(!"PENDING".equals(booking.getStatus())||!("APPROVED".equals(status)||"REJECTED".equals(status)))throw new IllegalStateException("Invalid booking status transition.");booking.setStatus(status);observers.forEach(o->o.onStatusChanged(booking));}
}
