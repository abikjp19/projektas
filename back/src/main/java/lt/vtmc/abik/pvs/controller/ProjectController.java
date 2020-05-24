package lt.vtmc.abik.pvs.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lt.vtmc.abik.pvs.model.Project;
import lt.vtmc.abik.pvs.service.ProjectService;

/**
 * @author Bartas Beitas
 */

@RestController
@RequestMapping("api/project")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {

	@Autowired
	ProjectService projectService;
	
	@GetMapping("/title/{title}")
	public List<Project> findByProjectTitle(@PathVariable String projectTitle){
		return projectService.findByProjectTitle(projectTitle);
	}
	
	@GetMapping("/id/{id}")
	public Project findByProjectId(@PathVariable int id) {
		return projectService.findByProjectId(id);
	}
	
	@GetMapping
	public Iterable<Project> getAll(Pageable pageable){
		return projectService.getAllPaged(pageable);
	}
	
	@GetMapping("/count")
	public long countProjects() {
		return projectService.countProjects();
	}
	
	@PostMapping
	public void add(@RequestBody Project project) {
		projectService.add(project);
	}
	
	@DeleteMapping("/id/{id}")
	public void deleteByProjectId(@PathVariable int id) {
		projectService.deleteByProjectId(id);
	}
	
	@DeleteMapping("/title/{title}")
	public void deleteByName(@PathVariable String projectTitle) {
		projectService.deleteByProjectTitle(projectTitle);
	}
	
	@PutMapping("/id/{id}")
	  public void updateProject(@RequestBody Project newProject, @PathVariable int id) {
		projectService.updateProject(id, newProject);
	  }
	
	@GetMapping("/export/projects.csv")
	public void exportProjects(HttpServletResponse res) throws Exception{
		projectService.exportProjects(res);
	}
	
	@PutMapping("/search")
	public List<Project> searchProjects(@RequestBody String fragment){
		return projectService.searchProjects(fragment);
	}
}