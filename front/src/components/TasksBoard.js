import React, { Component } from 'react';
import AxiosMethods from "../service/AxiosMethods.js";
import BoardCard from './BoardCard.js'

class TasksBoard extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            tasks: [],
            projectId: this.props.match.params.id1
        };
        console.log(this.state.projectId)
        console.log(this.state.tasks)
    }

    componentDidMount() {
        this.refreshTasks(this.state.projectId);

    }

    refreshTasks = (projectId) => {
        AxiosMethods.getAllTasks(projectId).then((res) => {
            console.log(res);
            this.setState({ tasks: res.data });
            console.log(this.state);
        });
    };

    // refreshTasks = () => {
    //     window.location.reload(false);
    //   };

    changeToNotStarted = (projectId, taskId) => {
        console.log(projectId, taskId);
        let updatedTask = AxiosMethods.findByTaskId(projectId, taskId)
            .then((res) => {
                const res1 = res.data;
                const updatedTask = {
                    id: res1.id,
                    taskTitle: res1.taskTitle,
                    taskDescription: res1.taskDescription,
                    taskStatus: "NOT_STARTED",
                    taskPriority: res1.taskPriority,
                    createTime: res1.createTime,
                    modTime: res1.modTime
                }
                console.log(updatedTask);
                AxiosMethods.updateTask(updatedTask, projectId, taskId);
                // this.refreshTasks(projectId);
                window.location.reload(false);
              
            })
    }

    changeToInProgress = (projectId, taskId) => {
        console.log(projectId, taskId);
        let updatedTask = AxiosMethods.findByTaskId(projectId, taskId)
            .then((res) => {
                const res1 = res.data;
                const updatedTask = {
                    id: res1.id,
                    taskTitle: res1.taskTitle,
                    taskDescription: res1.taskDescription,
                    taskStatus: "IN_PROGRESS",
                    taskPriority: res1.taskPriority,
                    createTime: res1.createTime,
                    modTime: res1.modTime
                }
                console.log(updatedTask);
                AxiosMethods.updateTask(updatedTask, projectId, taskId);
                // this.refreshTasks(projectId);
                window.location.reload(false);
                
            })
    }



    changeToDone = (projectId, taskId) => {
        console.log(projectId, taskId);
        let updatedTask = AxiosMethods.findByTaskId(projectId, taskId)
            .then((res) => {
                const res1 = res.data;
                const updatedTask = {
                    id: res1.id,
                    taskTitle: res1.taskTitle,
                    taskDescription: res1.taskDescription,
                    taskStatus: "DONE",
                    taskPriority: res1.taskPriority,
                    createTime: res1.createTime,
                    modTime: res1.modTime
                }
                console.log(updatedTask);
                AxiosMethods.updateTask(updatedTask, projectId, taskId);
                // this.refreshTasks(projectId);
                window.location.reload(false);
                
            })
    }

    render() {
        const notStarted = this.state.tasks.filter(task => task.taskStatus === "NOT_STARTED");
        const inProgress = this.state.tasks.filter(task => task.taskStatus === "IN_PROGRESS");
        const done = this.state.tasks.filter(task => task.taskStatus === "DONE");

        return (
            <div>
                <div className="container-fluid">
                    <div className="row justify-content-between d-flex flex-column flex-md-row align-items-center p-1 px-md-4 mb-3 bg-nav-color border-bottom shadow-sm header">
                        <h3 className="col-lg-1 col-sm-1 mt-2 ml-5">Tasks </h3>
                        <p className="col-lg-2 col-sm-3 mt-2 "><b>Project Id {this.state.projectId}</b></p>
                        <a className="col-lg-2 col-sm-3 btn btn-outline-dark " href={'/projects/id/' + this.state.projectId + '/tasks/'}>Back To Tasks List</a>
                    </div>

                    <div className="row ">
                        <div className="col-4">
                            <h5>Not Started</h5>
                            {notStarted.map((task) => (
                                <div className={"card" + (task.taskPriority == "LOW" ? " bg-low" : task.taskPriority == "MEDIUM" ? " bg-medium" : " bg-high")}
                                    style={{ width: "18rem" }} key={task.id}>
                                    <div className="card-body">
                                        <p className="card-title"><b>{task.taskTitle}</b></p>
                                        {/* <h5 className="card-title">{task.taskTitle}</h5> */}
                                        <p className="card-text">{task.taskDescription}</p>
                                        {/* <p className="card-text"><b>Move To:</b></p> */}
                                        <button
                                            onClick={() => this.changeToInProgress(this.state.projectId, task.id)}
                                            className="btn btn-primary mr-2">In Progress</button>
                                        <button
                                            onClick={() => this.changeToDone(this.state.projectId, task.id)}
                                            className="btn btn-primary mr-2">Done</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-4">
                            <h5>In Progress</h5>
                            {inProgress.map((task) => (
                                <div className={"card" + (task.taskPriority == "LOW" ? " bg-low" : task.taskPriority == "MEDIUM" ? " bg-medium" : " bg-high")}
                                    style={{ width: "18rem" }} key={task.id}>
                                    <div className="card-body">
                                        <p className="card-title"><b>{task.taskTitle}</b></p>
                                        {/* <h5 className="card-title">{task.taskTitle}</h5> */}
                                        <p className="card-text">{task.taskDescription}</p>
                                        {/* <p className="card-text"><b>Move To:</b></p> */}
                                        <button
                                            className="btn btn-primary mr-2"
                                            onClick={() => this.changeToNotStarted(this.state.projectId, task.id)}
                                        >Not Started</button>
                                        <button
                                            onClick={() => this.changeToDone(this.state.projectId, task.id)}
                                            className="btn btn-primary mr-2">Done</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-4">
                            <h5>Done</h5>
                            {done.map((task) => (
                                <div className={"card" + (task.taskPriority == "LOW" ? " bg-low" : task.taskPriority == "MEDIUM" ? " bg-medium" : " bg-high")}
                                    style={{ width: "18rem" }} key={task.id}>
                                    <div className="card-body">
                                        <p className="card-title"><b>{task.taskTitle}</b></p>
                                        {/* <h5 className="card-title">{task.taskTitle}</h5> */}
                                        <p className="card-text">{task.taskDescription}</p>
                                        {/* <p className="card-text"><b>Move To:</b></p> */}
                                        <button
                                            onClick={() => this.changeToInProgress(this.state.projectId, task.id)}
                                            className="btn btn-primary mr-2">In Progress</button>
                                        <button
                                            onClick={() => this.changeToNotStarted(this.state.projectId, task.id)}
                                            className="btn btn-primary">Not Started</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TasksBoard;