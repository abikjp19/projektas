package lt.vtmc.abik.pvs.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * @author Bartas Beitas
 */

@Entity
public class Project {

	/*
	 * Dar padaryti:
	 * toString() metoda,
	 * setUnfinishedTasks logika.
	 * Implementuoti listOfTasks.
	 */
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	private String projectTitle;
	private String projectDescription;
	private int totalTasks;
	private int unfinishedTasks;
	private boolean isFinished = false;
//	private List<Task> listOfTasks = new ArrayList<Task>();
	
	protected Project() {};
	
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
	
}
