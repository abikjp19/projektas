import React, { Component } from "react";
import AxiosMethods from "../service/AxiosMethods";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaListAlt } from "react-icons/fa";
import ProjectSearch from './ProjectSearch';
import Axios from 'axios';
import {FaAngleDoubleLeft} from "react-icons/fa"
import {FaAngleLeft} from "react-icons/fa"
import {FaAngleDoubleRight} from "react-icons/fa"
import {FaAngleRight} from "react-icons/fa"






class ProjectsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      message: null,
      totalProjects: 0,
      thisPage: 1,
      prepage: 10,
    };
  }

  componentDidMount() {
    this.refreshProject(this.state.thisPage);
  }

  refreshProject = (thisPage) => {
    thisPage -=1;
    Axios.get("http://localhost:8080/api/project?page="+thisPage+"&size="+this.state.prepage)
    .then(
      res => {
        this.setState({projects: res.data})
        console.log(res.data)
      }
    )
    AxiosMethods.getProjectsCount().then(res => this.setState({totalProjects: res.data}))
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
  const pagesCount = Math.ceil(this.state.totalProjects / this.state.prepage) ;
  if(this.state.thisPage !== pagesCount && pagesCount !== 0){
  this.state.thisPage +=1;
  this.componentDidMount();
  }
}

previousPage(){
  if(this.state.thisPage > 1){
  this.state.thisPage -=1;
  this.componentDidMount();
  }
}

pagePress(value){
  this.state.thisPage = value;
  this.componentDidMount();
}

 
  render() {
    console.log("render");
    const pagesCount = Math.ceil(this.state.totalProjects / this.state.prepage) ;
    //  console.log(this.state.projects.length);
    //  console.log(this.state.prepage);
    const pages = [];

    for(var i=1; i<= pagesCount; i++){
      pages.push(i);
    }
    return (
      <div className="container-fluid">
        <div className="row d-flex flex-column flex-md-row align-items-center p-2 px-md-4 mb-3 bg-nav-color border-bottom shadow-sm header">
          <h3 className="col-lg-3 mt-2 ml-5">All Projects</h3>

          <ProjectSearch search={this.search} projectId={this.state.projects.projectId}/>
          <button
            className=" col-lg-2 btn btn-outline-dark mr-2"
            onClick={this.addProjectClick}
            type="submit"
          >
            Create
          </button>

          <a className=" col-lg-2 btn btn-outline-dark" href="http://localhost:8080/api/project/export/projects.csv"> Export</a>

          {/* <form className="form-inline col-lg-4 col-sm-4">
            <input className="form-control mr-sm-2 input-color border border-dark" type="search" />
            <button className="btn btn-outline-dark my-2 my-sm-0 " type="submit">Search</button>
          </form> */}



        </div>

        <div className="container">
          <table className="table table-striped">
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
          <div >
                <nav aria-label="Page navigation example">
  <ul className="pagination">
  <li className="page-item"><button className="btn" onClick={() => this.pagePress(1)}><FaAngleDoubleLeft/></button></li>
  <li className="page-item"><button className="btn" onClick={() => this.previousPage()}><FaAngleLeft/></button></li>
  <li className="page-item"><button className="btn border" > {this.state.thisPage} </button></li>
  <li className="page-item"><button className="btn" onClick={() => this.nextPage()}><FaAngleRight/></button> </li>
  <li className="page-item"><button className="btn" onClick={() => this.pagePress(pagesCount)}><FaAngleDoubleRight/></button></li>
  </ul>
</nav>
                </div>
        </div>
      </div>
    );
  }
}

export default ProjectsList;
