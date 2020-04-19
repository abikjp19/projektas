package lt.vtmc.abik.pvs.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.vtmc.abik.pvs.model.Task;
import lt.vtmc.abik.pvs.repository.ProjectRepository;
import lt.vtmc.abik.pvs.repository.TaskRepository;

/**
 * @author Bartas Beitas
 */

@Service
public class TaskService {

	TaskRepository taskRepository;
	ProjectRepository projectRepository;
	
	@Autowired
	public TaskService(TaskRepository repo, ProjectRepository repo2) {
		super();
		this.taskRepository = repo;
		this.projectRepository = repo2;
	}
	
	public List<Task> fintByTaskTitle(String taskTitle){
		return taskRepository.findByTaskTitle(taskTitle);
	}
	
	public Task findByTaskId(int id) {
		return taskRepository.findByTaskId(id);
	}
	
	public Iterable<Task> getAll(int projectId){
		return taskRepository.findAll().stream().filter(task -> task.getProject().getId() == projectId).collect(Collectors.toList());
	}
	
	public void add(Task task, int projectId) {
		projectRepository.findByProjectId(projectId).addTask(task);
		taskRepository.save(task);
		System.out.println("Task added.");
	}
	
	public void deleteByTaskId(int id) {
		taskRepository.deleteById(id);
		System.out.println("Task with the id of '" + id + "' was deleted.");
	}
	
	public void deleteByTaskTitle(String taskTitle) {
		taskRepository.deleteByTaskTitle(taskTitle);
		System.out.println("Task with the title of '" + taskTitle + "' was deleted.");
	}
	
	public void updateTask(int id, Task newTask) {
		int oldId = this.findByTaskId(id).getId();
		newTask.setId(oldId);
		taskRepository.save(newTask);
	}
}
