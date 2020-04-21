import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Switch } from "react-router-dom";
import Header from './components/Header.js';
import TasksList from './components/TasksList.js'
import ProjectsList from './components/ProjectsList.js';
import ProjectForm from './components/ProjectForm.js';
import TaskForm from './components/TaskForm.js';
import Error from './components/Error.js';

function App() {
  return (
    
      <div>
            <Header/>
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

export default App;
