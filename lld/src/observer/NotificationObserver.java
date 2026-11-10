package observer;
import model.*; import service.NotificationService;
public class NotificationObserver implements BookingObserver {
    private final NotificationService notificationService;
    public NotificationObserver(NotificationService service){this.notificationService=service;}
    @Override public void onStatusChanged(Booking booking){notificationService.notify(booking.getUser(),"Your booking for "+booking.getResource().getName()+" has been "+booking.getStatus().toLowerCase()+".");}
}
