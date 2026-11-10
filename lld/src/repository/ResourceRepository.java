package repository;
import model.Resource;
import java.util.Optional;
public interface ResourceRepository { Optional<Resource> findById(int id); }
