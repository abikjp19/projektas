package lt.vtmc.abik.pvs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lt.vtmc.abik.pvs.model.Task;

/**
 * @author Bartas Beitas
 */

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer>{

	List<Task> findByTaskTitle(String taskTitle);
	
	Task findByTaskId(int id);
	
	void deleteByTaskTitle(String taskTitle);
	
	void deleteByTaskId(int id);
	
}
