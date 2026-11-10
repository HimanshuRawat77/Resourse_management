package model;
public class Auditorium extends Resource {
    public Auditorium(int id,String name,String location,int capacity){super(id,name,location,capacity);}
    @Override public boolean isAvailable(){return "AVAILABLE".equals(getStatus());}
    @Override public String getType(){return "AUDITORIUM";}
}
