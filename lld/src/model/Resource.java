package model;

public abstract class Resource {
    private int id;
    private String name;
    private String location;
    private int capacity;
    private String status;

    protected Resource(int id, String name, String location, int capacity) {
        this.id=id; this.name=name; this.location=location; this.capacity=capacity; this.status="AVAILABLE";
    }
    public int getId(){return id;} public void setId(int id){this.id=id;}
    public String getName(){return name;} public void setName(String name){this.name=name;}
    public String getLocation(){return location;} public void setLocation(String location){this.location=location;}
    public int getCapacity(){return capacity;} public void setCapacity(int capacity){if(capacity<1)throw new IllegalArgumentException("Capacity must be positive.");this.capacity=capacity;}
    public String getStatus(){return status;} public void setStatus(String status){this.status=status;}
    public abstract boolean isAvailable();
    public abstract String getType();
}
