package lt.vtmc.abik.pvs.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

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
	 */
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
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
//	private List<Task> listOfTasks = new ArrayList<Task>();
	
	protected Project() {};
	
	public Project(String title, String description) {
		this.projectTitle = title;
		this.projectDescription = description;
	}
	
	//Getteriu ir Setteriu bloko pradzia.
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
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

	//Getteriu ir Setteriu bloko pabaiga.
	
//	@Override
//	public String toString() {
//		return "Project [id=" + id + ", projectTitle=" + projectTitle + ", projectDescription=" + projectDescription
//				+ ", totalTasks=" + totalTasks + ", unfinishedTasks=" + unfinishedTasks + ", isFinished=" + isFinished
//				+ "]";
//	}
	
}
