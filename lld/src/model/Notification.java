package model;
import java.time.LocalDateTime;
public class Notification {
    private final int userId; private final String message; private final LocalDateTime createdAt;
    public Notification(int userId,String message){this.userId=userId;this.message=message;this.createdAt=LocalDateTime.now();}
    public int getUserId(){return userId;} public String getMessage(){return message;} public LocalDateTime getCreatedAt(){return createdAt;}
}
