import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/Header.js';
import ProjectTasks from './components/ProjectTasks.js';
import ProjectsList from './components/ProjectsList.js';
import ProjectForm from './components/ProjectForm.js';

function App() {
  return (
    
      <div>
            <Header/>
            <Router >
               
                <Switch>
                    <Route path="/" exact component={ProjectsList} />
                    <Route path="/projects" exact component={ProjectsList} />
                    <Route path="/projects/:id" exact component={ProjectForm} />
                    {/* <Route path="/projects/:id/tasks" exact component={ProjectTasks} /> */}
                </Switch>
                
            </Router>
            </div>
   
  );
}

export default App;
