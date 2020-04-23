package lt.vtmc.abik.pvs.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Bartas Beitas
 */

@Entity
public class Task {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int taskId;
	
	@Column(nullable=false)
	private String taskTitle;
	
	@Column(nullable=false)
	private String taskDescription;
	
	@Enumerated(EnumType.STRING)
	//@Column(nullable=false)
	private TaskPriority taskPriority = TaskPriority.LOW;
	
	@Enumerated(EnumType.STRING)
	//@Column(nullable=false)
	private TaskStatus taskStatus = TaskStatus.NOT_STARTED;
	
	@Column(updatable = false)
	@CreationTimestamp
	private LocalDateTime createTime;
	
	@UpdateTimestamp
	@Column
	private LocalDateTime modTime;
	
	@ManyToOne(fetch=FetchType.LAZY, optional = false)
	@JoinColumn(name="project_id", nullable = false)
	@JsonIgnore
	private Project project;
	
	protected Task() {};
	
	public Task(String title, String description) {
		this.taskTitle = title;
		this.taskDescription = description;
		//this.project.setTotalTasks();
		//this.project.setUnfinishedTasks();
	}

	public int getId() {
		return taskId;
	}

	public String getTaskTitle() {
		return taskTitle;
	}

	public String getTaskDescription() {
		return taskDescription;
	}

	public TaskPriority getTaskPriority() {
		return taskPriority;
	}

	public TaskStatus getTaskStatus() {
		return taskStatus;
	}

	public LocalDateTime getCreateTime() {
		return createTime;
	}

	public LocalDateTime getModTime() {
		return modTime;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public Project getProject() {
		return project;
	}

	public void setId(int id) {
		this.taskId = id;
	}

	public void setTaskTitle(String taskTitle) {
		this.taskTitle = taskTitle;
	}

	public void setTaskDescription(String taskDescription) {
		this.taskDescription = taskDescription;
	}

	public void setTaskPriority(TaskPriority taskPriority) {
		this.taskPriority = taskPriority;
	}

	public void setTaskStatus(TaskStatus taskStatus) {
		this.taskStatus = taskStatus;
	}

//	public void setModTime(LocalDateTime modTime) {
//		this.modTime = modTime;
//	}
	
	//Getteriu ir Setteriu bloko pradzia.
	
}