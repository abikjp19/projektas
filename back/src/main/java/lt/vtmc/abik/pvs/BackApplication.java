package lt.vtmc.abik.pvs;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import lt.vtmc.abik.pvs.model.Project;
import lt.vtmc.abik.pvs.model.Task;
import lt.vtmc.abik.pvs.model.TaskPriority;
import lt.vtmc.abik.pvs.model.TaskStatus;
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
			if (repo.count() == 0 && repo2.count() == 0) {
				Project proj1 = new Project("Karūna", "Juodasis šokoladas su migdolais");
				Project proj2 = new Project("Princas", "Pieniškas šokoladas su tiramisu įdaru");
				Project proj3 = new Project("Karštas šokoladas", "Toks skanus kaip operos ir baleto teatre");

				Task task1 = new Task("Prie kavos", "Du gabaliukai kasdien");
				Task task2 = new Task("Krims-krimst", "hmmm");
				Task task3 = new Task("Karti kakava", "Tirpsta burnoje");
				Task task4 = new Task("Schogetten", "Pieniškas, tamsus ar su įdaru?");
				Task task5 = new Task("Triufeliai", "Glaistyti ir labai skanūs.");
				Task task6 = new Task("Baltijos kelias", "Didelis, lietuviškas ir skanus saldainių rinkinys.");
				Task task7 = new Task("Pergalė", "Šokoladas su linų sėmenėmis? Ar tai gali būti skanu?");

				proj1.addTask(task1);
				proj1.addTask(task2);
				proj2.addTask(task3);
				proj1.addTask(task4);
				proj1.addTask(task5);
				proj1.addTask(task6);
				proj1.addTask(task7);
				repo.save(proj1);
				repo.save(proj2);
				repo.save(proj3);
				repo2.save(task1);
				repo2.save(task2);
				repo2.save(task3);
				repo2.save(task4);
				repo2.save(task5);
				repo2.save(task6);
				repo2.save(task7);
			}
		};
	}
}