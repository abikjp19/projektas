package lt.vtmc.abik.pvs.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
	private static final Logger logger = LoggerFactory.getLogger(TaskService.class);
	
	@Autowired
	public TaskService(TaskRepository repo, ProjectRepository repo2) {
		super();
		this.taskRepository = repo;
		this.projectRepository = repo2;
	}
	
	public List<Task> findByTaskTitle(String taskTitle){
		return taskRepository.findByTaskTitle(taskTitle);
	}
	
	public Task findByTaskId(int id) {
		return taskRepository.findByTaskId(id);
	}
	
	public List<Task> getAll(int projectId){
		logger.info("Retrieving all tasks of project with id of '" + projectId + "'");
		return taskRepository.findAll().stream().filter(task -> task.getProject().getId() == projectId).collect(Collectors.toList());
	}
	
	public List<Task> getAllPaged(int projectId, Pageable pageable){
		logger.info("Retrieving all tasks of project with id of '" + projectId + "'");
		return taskRepository.findAll(pageable).getContent().stream().filter(task -> task.getProject().getId() == projectId).collect(Collectors.toList());
	}
	
	public void add(Task task, int projectId) {
		projectRepository.findByProjectId(projectId).addTask(task);
		taskRepository.save(task);
		logger.info("New task added to project with id of '" + projectId + "'");
	}
	
	public void deleteByTaskId(int taskId, int projectId) {
		projectRepository.findByProjectId(projectId).removeTask(taskRepository.findByTaskId(taskId));
		projectRepository.save(projectRepository.findByProjectId(projectId));
		//taskRepository.deleteById(taskId);
		logger.info("Task with the id of '" + taskId + "' was deleted.");
	}
	
	public void deleteByTaskTitle(String taskTitle) {
		taskRepository.deleteByTaskTitle(taskTitle);
		logger.info("Task with the title of '" + taskTitle + "' was deleted.");
	}
	
	public void updateTask(int id, Task newTask) {
		Task oldTask = this.findByTaskId(id);
		oldTask.setTaskDescription(newTask.getTaskDescription());
		oldTask.setTaskPriority(newTask.getTaskPriority());
		oldTask.setTaskStatus(newTask.getTaskStatus());
		oldTask.setTaskTitle(newTask.getTaskTitle());
		oldTask.getProject().setTotalTasks();
		oldTask.getProject().setUnfinishedTasks();
		projectRepository.save(oldTask.getProject());
		taskRepository.save(oldTask);
		logger.info("Task with id of '" + id + "' was updated.");
	}
	
	public void exportTasks(HttpServletResponse res, int projectId) throws Exception {
		res.setContentType("text/csv");
		res.setCharacterEncoding("UTF-8");
		StatefulBeanToCsv expTasks = new StatefulBeanToCsvBuilder(res.getWriter()).withSeparator(';').withQuotechar(CSVWriter.NO_QUOTE_CHARACTER).build();
		List<Task> tasks = new ArrayList<Task>();
		this.getAll(projectId).forEach(tasks::add);
		expTasks.write(tasks);
		logger.info("Exporting tasks of project with id of '" + projectId + "'");
	}
	
	public List<Task> searchTasks(String fragment, int projectId){
		logger.info("Searching for tasks containing '" + fragment + "' in project with id of '" + projectId + "'");
		List<Task> results = new ArrayList<Task>();
		try{
			int id = Integer.parseInt(fragment);
			Task byId = this.findByTaskId(id);
			if(byId != null && byId.getProject().getId() == projectId)
				results.add(byId);
		}
		catch(NumberFormatException e) {}
		for (Task task : this.getAll(projectId)) {
			if(task.getTaskTitle().toLowerCase().contains(fragment.toLowerCase()))
				results.add(task);
		}
		return results;
	}
}