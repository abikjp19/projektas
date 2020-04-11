import React, { Component } from "react";
import "./CreateProjectForm.css";
import Project from "../Project/Project";

class CtreateProjectForm extends Component {
    constructor(props){
      super(props);

      this.state = {
      projects: [
        {
          name: "Projektas pirmas",
          description: "Aprašymas pirmo projekto lorem ipsum trampampam",
          id: Date.now(),
        },
        {
          name: "Projektas antras",
          description: "Aprašymas antro projekto lorem ipsum trampampam",
          id: Date.now() + 1,
        },
      ],
      name: "",
      description: "",
      btn: "Submit",
      updateId: "",
    };
  }

  inputChange = (e) =>{
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitForm = (e) =>{
    e.preventDefault();
    if(this.state.btn === "Submit"){
      const data = [
        ...this.state.projects,
        {
          id: Date.now(),
          name: this.state.name,
          description: this.state.description,
        }
      ];
      this.setState({
        projects: data,
        name: "",
        description: "",
      });
    }else{
      const data = [...this.state.projects];
      const index = this.state.projects.findIndex(
        (proj) => proj.id === this.state.updateId
      );
      data[index]={
        ...data[index],
        name: this.state.name,
        description: this.state.description,
      };
      this.state({
        projects: data,
        btn: "Submit",
        name: "",
        description: "",
      });
    }
  };

  deleteProject = (id) => {
    const data = this.state.projects.filter((proj) => proj.id !== id);
    this.setState({
      projects: data,
    });
  };
  
  editProject = (proj) =>{
    this.setState({
      name: proj.name,
      description: proj.description,
      btn: "Update",
      updateId: proj.id,
    });
  };

  render() {
    return (
      <div className="container">
        <div className="form-group row">
          <div className="col-4">
          <form className="border p-3 m-2" onSubmit={this.submitForm}>
          <label htmlFor="exampleFormControlInput1">Project title</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            value={this.state.name}
            name="name"
            onChange={this.inputChange}
          />
       

        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Project description</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={this.state.description}
            name="description"
            onChange={this.inputChange}
          ></textarea>
        </div>

        <button
          className="btn btn-outline-info my-2 my-sm-0 ml-2"
          type="submit"
        >
          {this.state.btn}
        </button>
        </form>
        </div>
        <div className="col-6">
            <Project 
            projects={this.state.projects}
            
            deleteProject={this.deleteProject}
            editProject={this.editProject}
            />
        </div>
      </div>
      </div>
    );
  }
}

export default CtreateProjectForm;
