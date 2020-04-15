package lt.vtmc.abik.pvs;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import lt.vtmc.abik.pvs.model.Project;
import lt.vtmc.abik.pvs.repository.ProjectRepository;

@SpringBootApplication
public class BackApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackApplication.class, args);
	}

	private static final Logger log = LoggerFactory.getLogger(BackApplication.class);
	
	@Bean
	public CommandLineRunner example(ProjectRepository repo) {
		return (args) -> {
			//repo.deleteAll();
			repo.save(new Project("project1", "Cha cha cha"));
//			repo.findById(1).setTotalTasks(22);
//			repo.findById(1).setUnfinishedTasks(21);
			repo.findById(1).setProjectTitle("Test");
			repo.save(new Project("project2", "Chi chi chi"));
//			repo.findById(2).setTotalTasks(10);
//			repo.findById(2).setUnfinishedTasks(0);
//			repo.findById(2).setFinished();
			repo.save(new Project("project3", "Cho cho cho"));
//			repo.findById(3).setTotalTasks(15);
//			repo.findById(3).setUnfinishedTasks(8);
		};
	}
}
