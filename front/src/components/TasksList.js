import React, { Component } from "react";
import AxiosMethods from "../service/AxiosMethods";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

class TasksList extends Component {
  constructor(props) {
    super(props);
    {console.log(props)}
    this.state = {
      tasks: [],
      message: null,
      projectId : this.props.match.params.id
    };
    {console.log(this.state.projectId)}
  }

  componentDidMount() {
    this.refreshTasks(this.state.projectId);
  }

  refreshTasks = (projectId) => {
    AxiosMethods.getAllTasks(projectId).then((res) => {
      console.log(res);
      this.setState({ tasks: res.data });
    });
  };

  deleteTaskClick = (projectId, taskId) => {
    AxiosMethods.deleteByTaskId(projectId, taskId).then((res) => {
      this.setState({ message: `Task was deleted successfuly` });
      this.refreshTasks();
    });
  };

  editTaskClick = (projectId, taskId) => {
    console.log("update " + taskId);
    this.props.history.push(`/projects/id/${projectId}/tasks/id/${taskId}`);
  };

  addTaskClick = (projectId) =>{
    this.props.history.push(`/projects/id/${projectId}/tasks/id/-1`);
  };

  render() {
    console.log('render')
    
    return (
    
      <div className="container">
       
              <button
                className="btn btn-outline-info my-2 my-sm-0 ml-2"
                onClick={() => this.addTaskClick(this.state.projectId, this.state.tasks.id)}
                //onClick={this.addTaskClick}
                type="submit"
              >Create New Task</button>
            
        <h3>All Project Tasks</h3>
        {this.state.message && (
          <div className="alert alert-success">{this.state.message}</div>
        )}
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                {/* <th>ProjectId</th>
                <th>TaskId</th> */}
                <th>Title</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Create Time</th>
                <th>Last Modification</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tasks.map((task) => (
                <tr key={task.id}>
                  {/* <td>{task.projectId}</td>
                  <td>{task.taskId}</td> */}
                  <td>{task.taskTitle}</td>
                  <td>{task.taskDescription}</td>
                  <td>{task.taskPriority}</td>
                  <td>{task.taskStatus}</td>
                  <td>{task.createTime}</td>
                  <td>{task.modTime}</td>

                  <td>
                    <button
                      className="btn btn-danger buttonDel mr-2"
                      onClick={() => this.deleteTaskClick(this.state.projectId, task.id)}
                    >
                      <FaTrashAlt />
                    </button>
                    <button
                      className="btn btn-success buttonEdit"
                      onClick={() => this.editTaskClick(this.state.projectId, task.id)}
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TasksList;
