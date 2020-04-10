import React from 'react';
import Card from '../Card/Card';
import './Project.css';
import '../Card/Card';

const Project = () =>{
return(
<div className='content'>
<div>
  <Card name="Project name 1" description="Description 1. Lorem ipsum Lorem ipsum Lorem ipsum "/>
  <Card name="Project name 2" description="Description 2. Lorem ipsum Lorem ipsum Lorem ipsum "/>
</div>
</div>
);
}

export default Project;