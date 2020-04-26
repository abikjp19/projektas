package lt.vtmc.abik.pvs.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.vtmc.abik.pvs.model.Project;
import lt.vtmc.abik.pvs.repository.ProjectRepository;

/**
 * @author Bartas Beitas
 */

@Service
public class ProjectService {

	ProjectRepository projectRepository;
	
	@Autowired
	public ProjectService(ProjectRepository repo) {
		super();
		this.projectRepository = repo;
	}
	
	public List<Project> findByProjectTitle(String projectTitle){
		return projectRepository.findByProjectTitle(projectTitle);
	}
	
	public Project findByProjectId(int id) {
		return projectRepository.findByProjectId(id);
	}
	
	public Iterable<Project> getAll(){
		return projectRepository.findAll();
	}
	
	public void add(Project project) {
		projectRepository.save(project);
		System.out.println("Project added.");
	}
	
	public void deleteByProjectId(int id) {
		projectRepository.deleteById(id);
		System.out.println("Project with the id of '" + id + "' was removed.");
	}
	
	public void deleteByProjectTitle(String projectTitle) {
		projectRepository.deleteByProjectTitle(projectTitle);
		System.out.println("Project with the title of '" + projectTitle + "' was removed.");
	}
	
	public void updateProject(int id, Project newProject) {
		Project oldProject = this.findByProjectId(id);
		oldProject.setProjectTitle(newProject.getProjectTitle());
		oldProject.setProjectDescription(newProject.getProjectDescription());
		oldProject.setTotalTasks();
		oldProject.setUnfinishedTasks();
		projectRepository.save(oldProject);
	}
}
