import React from 'react';
import {Route, Switch } from "react-router-dom";
import ProjectsList from './ProjectsList.js';
import ProjectForm from './ProjectForm.js';
import TasksList from './TasksList.js';
import TaskForm from './TaskForm.js';
import Error from './Error.js';


function Main(props) {
    return (
        
            <div className="main-bg-color">
                <Switch>
                    <Route path="/" exact component={ProjectsList} />
                    <Route path="/projects" exact component={ProjectsList} />
                    <Route path="/projects/:id" exact component={ProjectForm} />
                    <Route path="/projects/id/:id/tasks" exact component={TasksList} />
                    <Route path="/projects/id/:id1/tasks/id/:id2" exact component={TaskForm} /> 
                    <Route component={Error}/>
                </Switch>
                </div>
        
    );
}

export default Main;