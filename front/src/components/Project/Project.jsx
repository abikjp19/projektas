import React from 'react';
import Card from '../Card/Card';
import './Project.css';
// import '../Card/Card';

export default function Project (props){



return(
<div className='content'>
 <ul>
  
    {props.projects.map((proj) => {
      return(
        <li key={proj.id}>
      <Card 
      name={proj.name}
      description={proj.description}
     deleteProject={props.deleteProject}
            editProject={props.editProject}
      />
      </li>
    )
    })
  }
  
  </ul>
</div>
);
}

