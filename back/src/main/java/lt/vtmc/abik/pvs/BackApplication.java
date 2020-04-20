package lt.vtmc.abik.pvs;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import lt.vtmc.abik.pvs.model.Project;
import lt.vtmc.abik.pvs.model.Task;
import lt.vtmc.abik.pvs.repository.ProjectRepository;
import lt.vtmc.abik.pvs.repository.TaskRepository;

@SpringBootApplication
public class BackApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackApplication.class, args);
	}

	private static final Logger log = LoggerFactory.getLogger(BackApplication.class);
	
	@Bean
	public CommandLineRunner example(ProjectRepository repo, TaskRepository repo2) {
		return (args) -> {
			//repo.deleteAll();
			Project proj1 = new Project("project1", "Cha cha cha"); 
			Project proj2 = new Project("project2", "Chi chi chi");
			Project proj3 = new Project("project3", "Cho cho cho");
			repo.save(proj1);
			repo.save(proj2);
			repo.save(proj3);
			
			Task task1 = new Task("task1", "Cha chi cho");
			Task task2 = new Task("task2", "Cho cha chi");
			Task task3 = new Task("task3", "Chi cho cha");
			proj1.addTask(task1);
			proj1.addTask(task2);
			proj2.addTask(task3);
			repo2.save(task1);
			repo2.save(task2);
			repo2.save(task3);
		};
	}
}