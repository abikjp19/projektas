import React, { Component } from "react";
import AxiosMethods from "../service/AxiosMethods";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaListAlt } from "react-icons/fa";
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
      console.log(res);
      this.refreshProject();
    });
  };

  editProjectClick = (id) => {
    console.log("update " + id);
    this.props.history.push(`/projects/${id}`);
  };

  addProjectClick = () => {
    this.props.history.push(`/projects/-1`);
  };

  showTaskList = (id) => {
    console.log("tasks of project " + id);
    this.props.history.push(`/projects/id/${id}/tasks`);
  };

  render() {
    console.log("render");
    return (
      <div className="container-fluid">
        <div className="row justify-content-between d-flex flex-column flex-md-row align-items-center p-2 px-md-4 mb-3 bg-nav-color border-bottom shadow-sm header">
          <h3 className="col-2 mt-2 ml-5">All Projects</h3>

          <button
            className=" col-2 btn btn-outline-dark"
            onClick={this.addProjectClick}
            type="submit"
          >
            Create New Project
          </button>
        </div>

        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Description</th>
                <th className="text-right">Tasks</th>
                <th className="text-right">Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.projects.map((proj) => (
                <tr key={proj.id}>
                  <td>{proj.id}</td>
                  <td onClick={() => this.showTaskList(proj.id)}>
                    {proj.projectTitle}
                  </td>
                  <td>{proj.projectDescription}</td>

                  <td className="text-right td-minimize" onClick={() => this.showTaskList(proj.id)}>
                    {proj.unfinishedTasks} / {proj.totalTasks}
                  </td>

                  <td class="text-special text-right td-minimize">
                    {proj.finished ? "Done" : "New"}
                  </td>
                  <td className="text-right  td-minimize-action">
                    <button
                      className="btn btn-danger buttonDel mr-2 btn-sm"
                      onClick={() => this.deleteProjectClick(proj.id)}
                    >
                      <FaTrashAlt/>
                    </button>
                    <button
                      className="btn btn-success buttonEdit mr-2 btn-sm"
                      onClick={() => this.editProjectClick(proj.id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-secondary buttonlist btn-sm"
                      onClick={() => this.showTaskList(proj.id)}
                    >
                      <FaListAlt />
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
