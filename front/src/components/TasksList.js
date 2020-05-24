import React, { Component } from "react";
import AxiosMethods from "../service/AxiosMethods";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import '../App.css';
import TaskSearch from './TaskSearch.js'
import Axios from "axios";
import {FaAngleDoubleLeft} from "react-icons/fa"
import {FaAngleLeft} from "react-icons/fa"
import {FaAngleDoubleRight} from "react-icons/fa"
import {FaAngleRight} from "react-icons/fa"



class TasksList extends Component {
  constructor(props) {
    super(props);
    console.log(props) 
    this.state = {
      tasks: [],
      message: null,
      projectId: this.props.match.params.id,
      totalTasks: 0,
      thisPage: 1,
      pageSize: 2,
    };
    console.log(this.state.projectId)
  }

  componentDidMount() {
    this.refreshTasks(this.state.projectId,this.state.thisPage);
}

refreshTasks=(projectId,thisPage)=> {
  thisPage-=1;
  Axios.get(
      "http://localhost:8080/api/project/id/"+projectId+"/task?page="+thisPage+"&size="+this.state.pageSize)
      .then(
          res => {
              this.setState({ tasks: res.data })
          }
      );  
    AxiosMethods.getAllTasks(this.state.projectId).then(res => this.setState({totalTasks: res.data.length}))
}

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

nextPage(){
  this.state.thisPage +=1;
  this.componentDidMount();
  console.log("nextPage");
}

previousPage(){
  this.state.thisPage -=1;
  this.componentDidMount();
  console.log("prevPage");
}

pageClick(value){
  this.state.thisPage = value;
  this.componentDidMount();
  console.log("pressed");
}

  render() {
    const pagesCount = Math.ceil(this.state.totalTasks / this.state.pageSize) ;

    const pages = [];

    for(var i=1; i<= pagesCount; i++){
      pages.push(i);
    }

    console.log(pages)

    // console.log(this.state.tasks.length);
    // console.log(this.state.pageSize);
    //console.log(this.state.thisPage);
    const path = `http://localhost:8080/api/project/id/${this.state.projectId}/task/export/project${this.state.projectId}Tasks.csv`

    return (

      <div className="container-fluid">
        <div className="row d-flex flex-column flex-md-row align-items-center p-1 px-md-4 mb-3 bg-nav-color border-bottom shadow-sm header">

  
         <h3 className="col-lg-3 col-sm-3 mt-2 ml-5">Tasks </h3>
         
          
         
          <TaskSearch search={this.search} projectId={this.state.projectId}/>
         
          <button
            className=" col-lg-1 col-sm-3 btn btn-outline-dark mr-2"
            onClick={() => this.addTaskClick(this.state.projectId, this.state.tasks.id)}
            type="submit"
          >
            Create
          </button>

          <a className=" col-lg-1 col-sm-3 btn btn-outline-dark mr-2" href={path}> Export</a>
           
          <a className="col-lg-1 col-sm-3 btn btn-outline-dark mr-2" href={'/projects/id/' + this.state.projectId + '/tasksboard'}>Board</a>

        </div>
        <div className="container">
        <p className="col-lg-2 col-sm-3 mt-2 "><b>Project Id {this.state.projectId}</b></p>
        
          <table className="table table-striped mb-0">
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

export default TasksList;
