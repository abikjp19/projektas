import React, { Component } from 'react';
import AxiosMethods from '../service/AxiosMethods.js';
import Axios from 'axios';
import {MdRefresh} from 'react-icons/md';
import '../App.css'
import {FaSearch} from "react-icons/fa"

class TaskSearch extends Component {
    constructor(props){
        super(props);
        console.log(props) 
        this.state = {
            projectId: this.props.projectId,
            searchTask: '',
            results: []
        }
    }

    refreshTasks = () => {
        window.location.reload(false);
      };
    
    getResult = () =>{
        if(this.state.searchTask.length == 0){
            console.log("labas");
            this.refreshTasks(this.props.projectId);
        }else{
        AxiosMethods.searchTasks(this.props.projectId, this.state.searchTask)
                .then((res) => {
                    const data = res.data;
                    console.log(data);
                    this.setState({results: data})
                    this.props.search(data);
                })  
            }
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
                    <form onSubmit={this.submitForm} className="form-inline form-pading">
                <input 
                className="input-max-width"
                name="searchTask"
                type="search"
                className="form-control mr-sm-2 input-color border border-dark col-lg-6 col-sm-4" 
                // placeholder="Search Task"
                onChange={this.inputChange}
                aria-label="Search"
                />
                <button className="btn btn-outline-dark my-2 mr-2 my-sm-0 " type="submit"
               onClick={this.submitForm}
                >Search</button>
                {/* <button className="btn btn-outline-dark my-2 my-sm-0 col-lg-2 col-sm-4" type="reset"
               onClick={() => this.refreshTasks(this.state.projectId)}
                ><MdRefresh/></button> */}
              </form>
                </div>
            );
        }
    }

export default TaskSearch;