import React, { Component } from "react";
import List from '../List/List'
import axios from 'axios';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [
        // {
        //   projectTitle: "Pirmas projektas",
        //   projectDescription: "Pirmo projekto aprašymas: sukurti programą projektų ir jų užduočių valdymui.",
        //   id: Date.now(),
        //   isFinished: "New",
        //   totalTasks: 0,
        //   unfinishedTasks: 0,
        // },
        // {
        //     projectTitle: "Antras projektas",
        //     projectDescription: "Antro projekto aprašymas: sukurti programą el parduotuvei.",
        //     id: Date.now()+1,
        //     isFinished: "New",
        //     totalTasks: 0,
        //     unfinishedTasks: 0,
        // },
      ],
      projectTitle: "",
      projectDescription: "",
      isFinished: "New",
      totalTasks: 0,
      unfinishedTasks: 0,
      btn: "Submit",
      updateId: "",
    };
  }

  componentDidMount(){
    axios.get(`http://localhost:8080/api/project/`)
      .then(res => {
        const project = res.data;
        this.setState({project});
      })
  }

  inputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    
    axios.delete(`http://localhost:8080/api/project/id/${this.state.id}`)
    .then(res => {
      console.log(res);
      console.log(res.data);
    });

    if (this.state.btn === "Submit") {
      const data = [
        ...this.state.projects,
        {
          id: Date.now(),
          projectTitle: this.state.projectTitle,
          projectDescription: this.state.projectDescription,
          isFinished: "New",
          totalTasks: 0,
          unfinishedTasks: 0,
        },
      ];
      console.log(data);
      this.setState({
        projects: data,
        projectTitle: "",
        projectDescription: "",
      });

      axios.post(`https://localhost:8080/api/project/`, {data})
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

    } else {
      const data = [...this.state.projects];
      const index = this.state.projects.findIndex(
        (proj) => proj.id === this.state.updateId
      );
      data[index] = {
        ...data[index],
        projectTitle: this.state.projectTitle,
        projectDescription: this.state.projectDescription,
      };
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