import React, { Component } from "react";
import AxiosMethods from "../service/AxiosMethods";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import '../App.css';
import TaskSearch from './TaskSearch.js'


class TasksList extends Component {
  constructor(props) {
    super(props);
    console.log(props) 
    this.state = {
      tasks: [],
      message: null,
      projectId: this.props.match.params.id
    };
    console.log(this.state.projectId)
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

  //  refreshTasks = () => {
  //       window.location.reload(false);
  //     };

  deleteTaskClick = (projectId, taskId) => {
    AxiosMethods.deleteByTaskId(projectId, taskId)
      .then((projectId) => {
        this.refreshTasks(this.state.projectId)
      })
      .then(console.log("res"));
  };

  editTaskClick = (projectId, taskId) => {
    console.log("update " + taskId);
    this.props.history.push(`/projects/id/${projectId}/tasks/id/${taskId}`);
  };

  addTaskClick = (projectId) => {
    this.props.history.push(`/projects/id/${projectId}/tasks/id/-1`);
  };

  search = (tasks) => {
    console.log(tasks);
    this.setState({tasks});
}

  render() {

const path = `http://localhost:8080/api/project/id/${this.state.projectId}/task/export/project${this.state.projectId}Tasks.csv`

    return (

      <div className="container-fluid">
        <div className="row justify-content-between d-flex flex-column flex-md-row align-items-center p-1 px-md-4 mb-3 bg-nav-color border-bottom shadow-sm header">

          <h3 className="col-lg-1 col-sm-1 mt-2 ml-5">Tasks </h3>
          <p className="col-lg-2 col-sm-3 mt-2 "><b>Project Id {this.state.projectId}</b></p>

          <button
            className=" col-lg-1 col-sm-3 btn btn-outline-dark "
            onClick={() => this.addTaskClick(this.state.projectId, this.state.tasks.id)}
            type="submit"
          >
            Create
          </button>

          <a className=" col-lg-1 btn btn-outline-dark" href={path}> Export</a>
           
          <a className="col-lg-1 col-sm-3 btn btn-outline-dark" href={'/projects/id/' + this.state.projectId + '/tasksboard'}>Board</a>

          <TaskSearch search={this.search} projectId={this.state.projectId}/>

        </div>
        <div className="container">
          <table className="table mb-0">
            <thead>
              <tr>
                {/* <th>ProjectId</th>
                <th>TaskId</th> */}
                <th>Title</th>
                <th>Description</th>
                <th className="text-right td-minimize">Priority</th>
                <th className="text-right td-minimize">Status</th>
                <th className="text-right td-minimize-action text-center">Create Time</th>
                <th className="text-right td-minimize-action text-center">Last Modification</th>
                <th className="text-right td-minimize text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tasks.map((task) => (
                <tr key={task.id}>
                  {/* <td>{task.projectId}</td>
                  <td>{task.taskId}</td> */}
                  <td>{task.taskTitle}</td>
                  <td>{task.taskDescription}</td>
                  <td className="text-special text-right td-minimize">{task.taskPriority}</td>
                  <td className="text-special text-right td-minimize">{task.taskStatus.replace(/_/, ' ')}</td>
                  <td className="text-right td-minimize-action">{task.createTime.slice(0, 10)} {task.createTime.slice(11, 19)}</td>
                  <td className="text-right td-minimize-action">{task.modTime.slice(0, 10)} {task.modTime.slice(11, 19)}</td>

                  <td className="text-right td-minimize">
                    <button
                      className="btn btn-danger buttonDel mr-2 btn-sm"
                      onClick={() => this.deleteTaskClick(this.state.projectId, task.id)}

                    >
                      <FaTrashAlt />
                    </button>
                    <button
                      className="btn btn-success buttonEdit btn-sm"
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
