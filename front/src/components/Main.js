import React from 'react';
import {Route, Switch } from "react-router-dom";
import ProjectsList from './ProjectsList.js';
import ProjectForm from './ProjectForm.js';
import TasksList from './TasksList.js';
import TaskForm from './TaskForm.js';
import Error from './Error.js';
import TasksBoard from './TasksBoard';


function Main(props) {
    return (
        
            <div className="main-bg-color">
                <Switch>
                    <Route path="/" exact component={ProjectsList} />
                    <Route path="/projects" exact component={ProjectsList} />
                    <Route path="/projects/:id" exact component={ProjectForm} />
                    <Route path="/projects/id/:id/tasks" exact component={TasksList} />
                    <Route path="/projects/id/:id1/tasks/id/:id2" exact component={TaskForm} /> 
                    <Route path="/projects/id/:id1/tasksboard" exact component={TasksBoard} /> 
                    <Route component={Error}/>
                </Switch>
                </div>
        
    );
}

export default Main;