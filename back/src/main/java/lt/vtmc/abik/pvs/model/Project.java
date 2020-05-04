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
import com.opencsv.bean.CsvBindByPosition;
import com.opencsv.bean.CsvIgnore;
/**
 * @author Bartas Beitas
 */

@Entity
public class Project {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@CsvBindByPosition(position = 0)
	private int projectId;
	
	@Column(nullable=false)
	@CsvBindByPosition(position = 1)
	private String projectTitle;
	
	@Column(nullable=false)
	@CsvBindByPosition(position = 2)
	private String projectDescription;
	
	@Column(nullable=true)
	@CsvBindByPosition(position = 3)
	private int totalTasks;
	
	@Column(nullable=true)
	@CsvBindByPosition(position = 4)
	private int unfinishedTasks;
	
	@Column(nullable=false)
	@CsvBindByPosition(position = 5)
	private boolean isFinished;
	
	@OneToMany(
			mappedBy="project",
			orphanRemoval=true,
			cascade=CascadeType.ALL,
			fetch=FetchType.EAGER
	)
	@ElementCollection
	@JsonIgnore
	@CsvIgnore
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
	
	public void setTotalTasks() {
		this.totalTasks = this.listOfTasks.size();
	}
	
	public int getUnfinishedTasks() {
		return unfinishedTasks;
	}
	
	public void setUnfinishedTasks() {
		int totalUnfinished = 0;
		for (Task task : listOfTasks) {
			if(!task.getTaskStatus().equals(TaskStatus.DONE)) {
				totalUnfinished++;
			}
		}
		if(totalUnfinished == 0 && this.totalTasks != 0) {
			this.setFinished(true);
		} else {
			this.setFinished(false);
		}
		this.unfinishedTasks = totalUnfinished;
	}
	
	public boolean isFinished() {
		return isFinished;
	}
	
	public void setFinished(boolean status) {
		this.isFinished = status;
	}

	public Set<Task> getListOfTasks() {
		return listOfTasks;
	}

	//Getteriu ir Setteriu bloko pabaiga.
	
	public void addTask(Task task) {
		this.listOfTasks.add(task);
		setTotalTasks();
		setUnfinishedTasks();
		task.setProject(this);
	}
	
	public void removeTask(Task task) {
		this.listOfTasks.remove(task);
		setTotalTasks();
		setUnfinishedTasks();
		task.setProject(null);
	}
}