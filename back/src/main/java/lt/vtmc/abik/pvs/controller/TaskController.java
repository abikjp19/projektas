package lt.vtmc.abik.pvs.controller;

import java.util.List;

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
import lt.vtmc.abik.pvs.service.TaskService;

/**
 * @author Bartas Beitas
 */

@RestController
@RequestMapping("api/project/id/{projectId}/task/")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

	@Autowired
	TaskService taskService;
	
	@GetMapping("id/{taskId}")
	public Task findByTaskId(@PathVariable int projectId, @PathVariable int taskId) {
		return taskService.findByTaskId(taskId);
	}
	
	@GetMapping("title/{taskTitle}")
	public List<Task> findByTaskTitle(@PathVariable int projectId, @PathVariable String taskTitle){
		return taskService.findByTaskTitle(taskTitle);
	}
	
	@GetMapping
	public Iterable<Task> getAllTasks(@PathVariable int projectId){
		return taskService.getAll(projectId);
	}
	
	@PostMapping
	public void addTask(@RequestBody Task task, @PathVariable int projectId) {
		taskService.add(task, projectId);
	}
	
	@DeleteMapping("id/{taskId}")
	public void deleteByTaskId(@PathVariable int projectId, @PathVariable int taskId) {
		taskService.deleteByTaskId(taskId, projectId);
	}
	
	@PutMapping("id/{taskId}")
	public void updateTask(@RequestBody Task newTask, @PathVariable int projectId, @PathVariable int taskId) {
		taskService.updateTask(taskId, newTask);
	}
}
