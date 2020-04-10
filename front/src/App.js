import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Project from './components/Project/Project';
import Task from './components/Tasks/Task';
import { Route, BrowserRouter } from 'react-router-dom';
import CtreateProjectForm from './components/CreateProjectForm/CtreateProjectForm';


// app yra komponente(t.y. f-ja, kuri grazina JSX zyme)
const App = () => {
  return (
    <BrowserRouter>
    <div className='app-wraper'>
     <Header />
      <Navbar />
     <div className='app-wraper-content'>
       <Route path='/form' component={CtreateProjectForm} />
       <Route path='/tasks' component={Task} />
       <Route path='/projects' component={Project} />
      </div>
   </div>
   </BrowserRouter>
  );
}

export default App;
