import factory.ResourceFactory; import model.*; import repository.BookingRepository; import service.*; import observer.*; import java.time.LocalDateTime;

public class Main {
    public static void main(String[] args) {
        System.out.println("Creating Auditorium using ResourceFactory...\n");
        Resource resource=ResourceFactory.createResource("AUDITORIUM");
        System.out.println("Resource: "+resource.getName()+"\nCapacity: "+resource.getCapacity()+"\n");
        User user=new User(1,"Himanshu Rawat","student@university.com","USER");
        Booking booking=new Booking(1,user,resource,LocalDateTime.now().plusDays(2),LocalDateTime.now().plusDays(2).plusHours(3),"Annual Dance Competition",350);
        NotificationService notifications=new NotificationService();
        BookingRepository inMemoryBookings=b->b;
        BookingService service=new BookingService(inMemoryBookings);
        service.addObserver(new NotificationObserver(notifications));
        System.out.println("Creating booking...\n");
        service.create(booking);
        System.out.println("Booking Status: "+booking.getStatus()+"\n");
        service.changeStatus(booking,"APPROVED");
        System.out.println("Admin approved booking.\n\nBooking Status: "+booking.getStatus()+"\n\nNotification:\n"+notifications.getNotifications().get(0).getMessage());

        Resource polymorphicResource;
        for(String type:new String[]{"AUDITORIUM","LIBRARY_HALL","MULTIPURPOSE_HALL"}) { polymorphicResource=ResourceFactory.createResource(type); System.out.println("\n"+polymorphicResource.getType()+" available: "+polymorphicResource.isAvailable()); }
    }
}
