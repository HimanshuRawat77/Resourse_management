package service;
import model.*; import java.util.*;
public class NotificationService {
    private final List<Notification> notifications=new ArrayList<>();
    public void notify(User user,String message){notifications.add(new Notification(user.getId(),message));}
    public List<Notification> getNotifications(){return Collections.unmodifiableList(notifications);}
}
