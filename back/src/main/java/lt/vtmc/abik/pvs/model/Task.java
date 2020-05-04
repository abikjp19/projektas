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
import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvBindByPosition;
import com.opencsv.bean.CsvDate;
import com.opencsv.bean.CsvIgnore;

/**
 * @author Bartas Beitas
 */

@Entity
public class Task {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@CsvBindByPosition(position = 0)
	private int taskId;
	
	@Column(nullable=false)
	@CsvBindByPosition(position = 1)
	private String taskTitle;
	
	@Column(nullable=false)
	@CsvBindByPosition(position = 2)
	private String taskDescription;
	
	@Enumerated(EnumType.STRING)
	@CsvBindByPosition(position = 3)
	private TaskPriority taskPriority = TaskPriority.LOW;
	
	@Enumerated(EnumType.STRING)
	@CsvBindByPosition(position = 4)
	private TaskStatus taskStatus = TaskStatus.NOT_STARTED;
	
	@Column(updatable = false)
	@CreationTimestamp
	@CsvBindByPosition(position = 5)
	@CsvDate("yyyy-MM-dd HH:mm:ss")
	private LocalDateTime createTime;
	
	@UpdateTimestamp
	@Column
	@CsvBindByPosition(position = 6)
	@CsvDate("yyyy-MM-dd HH:mm:ss")
	private LocalDateTime modTime;
	
	@ManyToOne(fetch=FetchType.EAGER, optional = false)
	@JoinColumn(name="project_id", nullable = false)
	@JsonIgnore
	@CsvIgnore
	private Project project;
	
	protected Task() {};
	
	public Task(String title, String description) {
		this.taskTitle = title;
		this.taskDescription = description;
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
	
	//Getteriu ir Setteriu bloko pradzia.
	
}