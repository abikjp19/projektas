import React, { Component } from "react";
import './CreateProjectForm.css';

class CtreateProjectForm extends Component {
  render() {
    return (
      
      <form className="container">
  <div className="form-group">
    <label for="exampleFormControlInput1">Project title</label>
    <input type="text" className="form-control" id="exampleFormControlInput1" />
  </div>
  
  <div className="form-group">
    <label for="exampleFormControlTextarea1">Project description</label>
    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" ></textarea>
  </div>

   <button className="btn btn-outline-info my-2 my-sm-0 ml-2" type="submit"><a href="/projects">Submit</a></button>
   
</form>
     
    );
  }
}

export default CtreateProjectForm;
