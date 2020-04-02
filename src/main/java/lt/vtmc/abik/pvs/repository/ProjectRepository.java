package lt.vtmc.abik.pvs.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import lt.vtmc.abik.pvs.model.Project;

/**
 * @author Bartas Beitas
 */

@Repository
public interface ProjectRepository extends CrudRepository<Project, Integer>{

	List<Project> findByProjectTitle(String projectTitle);
	
	Project findById(int id);
	
	void deleteByProjectTitle(String projectTitle);
}
