package service;
import repository.ResourceRepository; import model.Resource; import java.util.Optional;
public class ResourceService { private final ResourceRepository repository; public ResourceService(ResourceRepository repository){this.repository=repository;} public Optional<Resource> findById(int id){return repository.findById(id);} }
