package model;
public class LibraryHall extends Resource {
    public LibraryHall(int id,String name,String location,int capacity){super(id,name,location,capacity);}
    @Override public boolean isAvailable(){return "AVAILABLE".equals(getStatus());}
    @Override public String getType(){return "LIBRARY_HALL";}
}
