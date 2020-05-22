import React, { Component } from "react";
import AxiosMethods from "../service/AxiosMethods";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaListAlt } from "react-icons/fa";
import ProjectSearch from './ProjectSearch';
import Axios from 'axios';

class ProjectsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      message: null,
      currentPage: 1,
      prepage: 8
    };
  }

  componentDidMount() {
    this.refreshProject(this.state.currentPage);
  }

  refreshProject = (currentPage) => {
    currentPage -=1;
    // AxiosMethods.getAll().then((res) => {
    //   console.log(res);
    //   this.setState({ projects: res.data });
    // });
    Axios.get("http://localcost:8080/api/project?page=" + currentPage + "&size=" + this.state.prepage)
    .then(
      res => {
        this.setState({projects: res.data})
        (console.log(res.data))
      }
    )
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

  finishedTasks = (unfinishedTasks, totalTasks) => {
    return totalTasks - unfinishedTasks;
  }

  search = (projects) => {
    console.log(projects);
    this.setState({projects});
}

nextPage(){
  this.state.currentPage +=1;
  this.componentDidMount();
}

priviusPage(){
  this.state.currentPage -=1;
  this.componentDidMount();
}

pagePressed(value){
  this.state.currentPage = value;
  this.componentDidMount();
}

  render() {
    console.log("render");
    return (
      <div className="container-fluid">
        <div className="row justify-content-between d-flex flex-column flex-md-row align-items-center p-2 px-md-4 mb-3 bg-nav-color border-bottom shadow-sm header">
          <h3 className="col-3 mt-2 ml-5">All Projects</h3>

          <button
            className=" col-2 btn btn-outline-dark"
            onClick={this.addProjectClick}
            type="submit"
          >
            Create
          </button>

          <a className=" col-2 btn btn-outline-dark" href="http://localhost:8080/api/project/export/projects.csv"> Export</a>

          {/* <form className="form-inline col-lg-4 col-sm-4">
            <input className="form-control mr-sm-2 input-color border border-dark" type="search" />
            <button className="btn btn-outline-dark my-2 my-sm-0 " type="submit">Search</button>
          </form> */}

<ProjectSearch search={this.search} projectId={this.state.projects.projectId}/>

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
                    {this.finishedTasks(proj.unfinishedTasks, proj.totalTasks)} / {proj.totalTasks}
                  </td>

                  <td className="text-special text-right td-minimize">
                    {proj.finished ? "Done" : "New"}
                  </td>
                  <td className="text-right  td-minimize-action">
                    <button
                      className="btn btn-danger buttonDel mr-2 btn-sm"
                      onClick={() => this.deleteProjectClick(proj.id)}
                    >
                      <FaTrashAlt />
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
          <div className="float-right" >
                <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item">
      <button className="btn btn" onClick={() => this.priviusPage()}>&laquo;</button>
      &nbsp;
    </li>
    <li class="page-item"><button className="btn btn" onClick={() => this.pagePressed(1)}>1</button></li>
    &nbsp;
    <li class="page-item"><button className="btn btn" onClick={() => this.pagePressed(2)}>2</button></li>
    &nbsp;
    <li class="page-item"><button className="btn btn" onClick={() => this.pagePressed(3)}>3</button></li>
    &nbsp;
    <li class="page-item">
    <button className="btn btn" onClick={() => this.nextPage()}>&raquo;</button>
    </li>
  </ul>
</nav>
                </div>
        </div>
      </div>
    );
  }
}

export default ProjectsList;
