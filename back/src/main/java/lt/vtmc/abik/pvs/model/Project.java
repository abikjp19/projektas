package lt.vtmc.abik.pvs.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Bartas Beitas
 */

@Entity
//@Table(name="PROJECT")
public class Project {

	/*
	 * Dar padaryti:
	 * setUnfinishedTasks logika.
	 * Implementuoti listOfTasks.
	 * removeTask.
	 */
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int projectId;
	
	@Column(nullable=false)
	private String projectTitle;
	
	@Column(nullable=false)
	private String projectDescription;
	
	@Column(nullable=true)
	private int totalTasks;
	
	@Column(nullable=true)
	private int unfinishedTasks;
	
	@Column(nullable=false)
	private boolean isFinished;
	
	@OneToMany(
			mappedBy="project",
			orphanRemoval=true,
			cascade=CascadeType.ALL,
			fetch=FetchType.EAGER
	)
	//@OneToMany
	@ElementCollection
	@JsonIgnore
	private Set<Task> listOfTasks = new HashSet<Task>();
	
	protected Project() {};
	
	public Project(String title, String description) {
		this.projectTitle = title;
		this.projectDescription = description;
	}
	
	//Getteriu ir Setteriu bloko pradzia.
	public int getId() {
		return projectId;
	}
	
	public void setId(int id) {
		this.projectId = id;
	}

	public String getProjectTitle() {
		return projectTitle;
	}
	
	public void setProjectTitle(String projectTitle) {
		this.projectTitle = projectTitle;
	}
	
	public String getProjectDescription() {
		return projectDescription;
	}
	
	public void setProjectDescription(String projectDescription) {
		this.projectDescription = projectDescription;
	}
	
	public int getTotalTasks() {
		return totalTasks;
	}
	
	public void setTotalTasks(int amount) {
//		this.totalTasks = this.listOfTasks.size();
		this.totalTasks = amount;
	}
	
	public int getUnfinishedTasks() {
		return unfinishedTasks;
	}
	
	public void setUnfinishedTasks(int unfinishedTasks) {
		//Padaryti logika.
		this.unfinishedTasks = unfinishedTasks;
	}
	
	public boolean isFinished() {
		return isFinished;
	}
	
	public void setFinished() {
		this.isFinished = true;
	}

	public Set<Task> getListOfTasks() {
		return listOfTasks;
	}

	//Getteriu ir Setteriu bloko pabaiga.
	
	public void addTask(Task task) {
		this.listOfTasks.add(task);
		task.setProject(this);
	}
}
