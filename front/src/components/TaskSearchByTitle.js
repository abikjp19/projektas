import React, { Component } from 'react';
import AxiosMethods from '../service/AxiosMethods.js';
import Axios from 'axios';

class TaskSearchByTitle extends Component {
    constructor(props){
        super(props);
        console.log(props) 
        this.state = {
            projectId: this.props.projectId,
            searchTask: '',
            results: []
        }
    }
    
    getResult = () =>{
        AxiosMethods.searchTasks(this.props.projectId, this.state.searchTask)
                .then((res) => {
                    const data = res.data;
                    console.log(data);
                    this.setState({results: data})
                    this.props.search(data);
                })     
    }
    
    inputChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    
    submitForm = (e) =>{
        e.preventDefault();
        this.getResult();
    }
    
        render() {
            return (
                <div>
                    <form onSubmit={this.submitForm} className="form-inline col-lg-4 col-sm-4">
                <input 
                name="searchTask"
                type="search"
                className="form-control mr-sm-2 input-color border border-dark" type="text"
                placeholder="Searh Task"
                onChange={this.inputChange}
                aria-label="Search"
                />
                {/* <button className="btn btn-outline-dark my-2 my-sm-0 " type="submit"
               onClick={() => this.searchTaskById(this.state.projectId, this. state.tasks.id)}
                >Search</button> */}
              </form>
                </div>
            );
        }
    }

export default TaskSearchByTitle;