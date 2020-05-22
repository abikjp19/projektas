package lt.vtmc.abik.pvs.service;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
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
	private static final Logger logger = LoggerFactory.getLogger(ProjectService.class);
	
	@Autowired
	public ProjectService(ProjectRepository repo) {
		super();
		this.projectRepository = repo;
	}
	
	public List<Project> findByProjectTitle(String projectTitle){
		logger.info("Searching for project with title of '" + projectTitle + "'.");
		return projectRepository.findByProjectTitle(projectTitle);
	}
	
	public Project findByProjectId(int id) {
		logger.info("Searching for project with id of '" + id + "'.");
		return projectRepository.findByProjectId(id);
	}
	
	public Iterable<Project> getAllPaged(Pageable pageable){
		logger.info("Retrieved all projects.");
		return projectRepository.findAll(pageable);
	}
	
	public Iterable<Project> getAll(){
		logger.info("Retrieved all projects.");
		return projectRepository.findAll();
	}
	
	public void add(Project project) {
		logger.info("New project added.");
		projectRepository.save(project);
	}
	
	public void deleteByProjectId(int id) {
		logger.info("Project with id '" + id + "' was deleted.");
		projectRepository.deleteById(id);
	}
	
	public void deleteByProjectTitle(String projectTitle) {
		projectRepository.deleteByProjectTitle(projectTitle);
		System.out.println("Project with the title of '" + projectTitle + "' was removed.");
	}
	
	public void updateProject(int id, Project newProject) {
		logger.info("Project with id of '" + id + "' was updated.");
		Project oldProject = this.findByProjectId(id);
		oldProject.setProjectTitle(newProject.getProjectTitle());
		oldProject.setProjectDescription(newProject.getProjectDescription());
		oldProject.setTotalTasks();
		oldProject.setUnfinishedTasks();
		projectRepository.save(oldProject);
	}
	
	public void exportProjects(HttpServletResponse res) throws Exception{
		res.setContentType("text/csv");
		res.setCharacterEncoding("UTF-8");
		StatefulBeanToCsv expProject = new StatefulBeanToCsvBuilder(res.getWriter()).withSeparator(';').withQuotechar(CSVWriter.NO_QUOTE_CHARACTER).build();
		List<Project> projects = new ArrayList<Project>();
		this.getAll().forEach(projects::add);
		expProject.write(projects);
		logger.info("Exporting projects.");
	}
	
	public List<Project> searchProjects(String fragment) {
		logger.info("Searching for projects containing '" + fragment + "'.");
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