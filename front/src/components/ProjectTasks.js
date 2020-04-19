import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AxiosMethods from '../service/AxiosMethods.js';

class ProjectTasks extends Component {
    constructor(props){
        super(props)
        this.state = {
           
        }
    }
    render() {
        return (
            <div>
                <h5>tasks</h5>
            </div>
        );
    }
}

export default ProjectTasks;