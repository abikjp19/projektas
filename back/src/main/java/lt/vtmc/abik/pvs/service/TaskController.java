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
	
	@GetMapping("id/{id}")
	public Task findByTaskId(@PathVariable int id) {
		return taskService.findByTaskId(id);
	}
	
	@GetMapping
	public Iterable<Task> getAll(){
		return taskService.getAll();
	}
	
	@PostMapping
	public void add(@RequestBody Task task) {
		taskService.add(task);
	}
	
	@DeleteMapping("id/{id}")
	public void deleteByTaskId(@PathVariable int id) {
		taskService.deleteByTaskId(id);
	}
	
	@PutMapping("id/{id}")
	public void updateTask(@RequestBody Task newTask, @PathVariable int id) {
		taskService.updateTask(id, newTask);
	}
}
