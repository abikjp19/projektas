package lt.vtmc.abik.pvs.service;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import com.opencsv.CSVWriter;
import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;

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
	
	public void exportProjects(HttpServletResponse res) throws Exception{
		res.setContentType("text/csv");
		StatefulBeanToCsv expProject = new StatefulBeanToCsvBuilder(res.getWriter()).withQuotechar(CSVWriter.NO_QUOTE_CHARACTER).build();
		List<Project> projects = new ArrayList<Project>();
		this.getAll().forEach(projects::add);
		expProject.write(projects);
	}
	
	public List<Project> searchProjects(String fragment) {
		List<Project> results = new ArrayList<Project>();
		try{
			int id = Integer.parseInt(fragment);
			Project byId = this.findByProjectId(id);
			if(byId != null)
				results.add(byId);
		}
		catch(NumberFormatException e) {}
		for (Project project : this.getAll()) {
			if(project.getProjectTitle().toLowerCase().contains(fragment.toLowerCase()))
				results.add(project);
		}
		return results;
	}
}