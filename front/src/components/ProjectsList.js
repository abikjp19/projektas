import React, { Component } from "react";
import AxiosMethods from "../service/AxiosMethods";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

class ProjectsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      message: null,
    };
  }

  componentDidMount() {
    this.refreshProject();
  }

  refreshProject = () => {
    AxiosMethods.getAll().then((res) => {
      console.log(res);
      this.setState({ projects: res.data });
    });
  };

  deleteProjectClick = (id) => {
    AxiosMethods.deleteById(id).then((res) => {
      this.setState({ message: `Project was deleted successfuly` });
      this.refreshProject();
    });
  };

  editProjectClick = (id) => {
    console.log("update " + id);
    this.props.history.push(`/projects/${id}`);
  };

  addProjectClick = () =>{
    
    this.props.history.push(`/projects/-1`);
  };

  showTaskList = (id) => {
    console.log("tasks of project " + id);
    this.props.history.push(`/projects/id/${id}/tasks`);
  };

  render() {
    console.log('render')
    return (
      <div className="container">
        
              <button
                className="btn btn-outline-info my-2 my-sm-0 ml-2"
                onClick={this.addProjectClick}
                type="submit"
              >
                Create New Project
              </button>
            
        <h3>All Projects</h3>
        {this.state.message && (
          <div className="alert alert-success">{this.state.message}</div>
        )}
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Description</th>
                <th>Tasks</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.projects.map((proj) => (
                <tr key={proj.id}>
                  <td>{proj.id}</td>
                  <td>{proj.projectTitle}</td>
                  <td>{proj.projectDescription}</td>

                  <td onClick={() => this.showTaskList(proj.id)}>
                    {proj.unfinishedTasks} / {proj.totalTasks}
                  </td>

                  <td>{proj.isFinished ? "Done" : "New"}</td>
                  <td>
                    <button
                      className="btn btn-danger buttonDel mr-2"
                      onClick={() => this.deleteProjectClick(proj.id)}
                    >
                      <FaTrashAlt />
                    </button>
                    <button
                      className="btn btn-success buttonEdit"
                      onClick={() => this.editProjectClick(proj.id)}
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

export default ProjectsList;
