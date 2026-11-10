package model;
public class MultipurposeHall extends Resource {
    public MultipurposeHall(int id,String name,String location,int capacity){super(id,name,location,capacity);}
    @Override public boolean isAvailable(){return "AVAILABLE".equals(getStatus());}
    @Override public String getType(){return "MULTIPURPOSE_HALL";}
}
