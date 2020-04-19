package lt.vtmc.abik.pvs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lt.vtmc.abik.pvs.model.Task;

/**
 * @author Bartas Beitas
 */

@RestController
@RequestMapping("api/project/{projectId}/")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

	@Autowired
	TaskService taskService;
	
	@GetMapping("{id}")
	public Task findByTaskId(@PathVariable int projectId, @PathVariable int taskId) {
		return taskService.findByTaskId(taskId);
	}
	
	@GetMapping
	public Iterable<Task> getAll(@PathVariable int projectId){
		return taskService.getAll();
	}
	
	@PostMapping
	public void add(@RequestBody Task task, @PathVariable int projectId) {
		taskService.add(task, projectId);
	}
	
	@DeleteMapping("{taskId}")
	public void deleteByTaskId(@PathVariable int projectId, @PathVariable int taskId) {
		taskService.deleteByTaskId(taskId);
	}
	
	@PutMapping("{taskId}")
	public void updateTask(@RequestBody Task newTask, @PathVariable int projectId, @PathVariable int taskId) {
		taskService.updateTask(taskId, newTask);
	}
}
