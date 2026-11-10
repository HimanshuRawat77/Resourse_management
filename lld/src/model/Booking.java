package model;
import java.time.LocalDateTime;
public class Booking {
    private int id; private User user; private Resource resource; private LocalDateTime startTime,endTime; private String purpose,status; private int expectedAttendees;
    public Booking(int id,User user,Resource resource,LocalDateTime start,LocalDateTime end,String purpose,int attendees){this.id=id;this.user=user;this.resource=resource;this.startTime=start;this.endTime=end;this.purpose=purpose;this.expectedAttendees=attendees;this.status="PENDING";}
    public int getId(){return id;} public User getUser(){return user;} public Resource getResource(){return resource;} public LocalDateTime getStartTime(){return startTime;} public LocalDateTime getEndTime(){return endTime;} public String getPurpose(){return purpose;} public int getExpectedAttendees(){return expectedAttendees;} public String getStatus(){return status;}
    public void setStatus(String status){this.status=status;}
}
