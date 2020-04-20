package lt.vtmc.abik.pvs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lt.vtmc.abik.pvs.model.Project;

/**
 * @author Bartas Beitas
 */

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer>{

	List<Project> findByProjectTitle(String projectTitle);
	
	Project findByProjectId(int id);
	
	void deleteByProjectTitle(String projectTitle);
}
