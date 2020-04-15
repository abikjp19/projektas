import React, { Component } from "react";
import List from '../List/List'
import axios from 'axios';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [
      ],
      projectTitle: "",
      projectDescription: "",
      finished: "New",
      totalTasks: 0,
      unfinishedTasks: 0,
      btn: "Submit",
      updateId: ""
    };
  }

  componentDidMount(){
    axios.get(`http://localhost:8080/api/project/`)
      .then(res => {
        const project = res.data;
        this.setState({projects: project});
        console.log(this.state.projects);
      })
  }

  inputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitForm = (e) => {
    e.preventDefault();
  
    if (this.state.btn === "Submit") {
    
      const newProject = {
        projectTitle: this.state.projectTitle,
        projectDescription: this.state.projectDescription,
        totalTasks: 0,
        unfinishedTasks: 0,
        finished: false,
      };
      const data = [
        ...this.state.projects,
        newProject,
      ];
      
      axios.post(`http://localhost:8080/api/project/`, newProject , {headers: {
        "Content-Type": "application/json"}
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
        axios.get(`http://localhost:8080/api/project/`);
       });

      console.log(data);
      this.setState({
        projects: data,
        projectTitle: "",
        projectDescription: "",
      });
    }
     else {
      const data = [...this.state.projects];
      const index = this.state.projects.findIndex(
        (proj) => proj.id === this.state.updateId
      );
      data[index] = {
        ...data[index],
        projectTitle: this.state.projectTitle,
        projectDescription: this.state.projectDescription,
      };

      axios.put(`http://localhost:8080/api/project/id/${this.state.updateId}`, data[index], {headers: {
        "Content-Type": "application/json"}
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
        axios.get(`http://localhost:8080/api/project/`);
       });

      this.setState({
        projects: data,
        btn: "Submit",
        projectTitle: "",
        projectDescription: "",
      });
    }
  };

  deleteProject = (id) => {
    const data = this.state.projects.filter((proj) => proj.id !== id);
   
    this.setState({
      projects: data,
    });

    axios.delete(`http://localhost:8080/api/project/id/${id}`)
    .then(res => {
      console.log(res);
      console.log(res.data);
    });
  };

  editProject = (proj) => {
    this.setState({
        projectTitle: proj.projectTitle,
        projectDescription: proj.projectDescription,
        btn: "Update",
        updateId: proj.id,
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 mt-2">
            <form className="border p-3" onSubmit={this.submitForm}>
              <h3 className="mb-3">Create New Project</h3>
              <div className="form-group">
                <label htmlFor="projectTitle">Project Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="projectTitle"
                  placeholder="Enter project title"
                  value={this.state.projectTitle}
                  name="projectTitle"
                  onChange={this.inputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="projectDescription">Project Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="projectDescription"
                  placeholder="Enter project description"
                  value={this.state.projectDescription}
                  name="projectDescription"
                  onChange={this.inputChange}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                {this.state.btn}
              </button>
            </form>
          </div>

          <div className="col-8 mt-2">
            {this.state.projects.length > 0 && (
              <List
                projects={this.state.projects}
                deleteProject={this.deleteProject}
                editProject={this.editProject}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default Form;