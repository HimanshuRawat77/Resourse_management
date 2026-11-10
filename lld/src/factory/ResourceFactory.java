package factory;
import model.*;
public final class ResourceFactory {
    private ResourceFactory(){}
    public static Resource createResource(String type){return switch(type){case "AUDITORIUM"->new Auditorium(1,"Main Auditorium","Main Campus",500);case "LIBRARY_HALL"->new LibraryHall(2,"Central Library Hall","Central Library",150);case "MULTIPURPOSE_HALL"->new MultipurposeHall(3,"Multipurpose Hall","Student Activity Center",250);default->throw new IllegalArgumentException("Unknown resource type: "+type);};}
}
