import React, { Component } from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import AxiosMethods from '../service/AxiosMethods.js';

class ProjectForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            projectTitle: "",
            projectDescription: ""
        }
    }

    componentDidMount(){
        console.log(this.state.id)
        if(this.state.id === -1){
            return
        }
        AxiosMethods.findById(this.state.id)
        .then(res => this.setState({
            projectTitle: res.data.projectTitle,
            projectDescription: res.data.projectDescription
        }))
    }

    onSubmit = (values) =>{
        
        let project = {
            id: this.state.id,
            projectTitle: values.projectTitle,
            projectDescription: values.projectDescription
        }
        if(this.state.id == -1){
            AxiosMethods.addProject(project)
            .then(() => this.props.history.push('/projects'))
            
        }else{
            AxiosMethods.updateProject(this.state.id, project)
            .then(() => this.props.history.push('/projects'))
        }
        console.log(values);

    }

    validate = (values) =>{
        let errors = {}
        if(!values.projectTitle){
            errors.projectTitle = "Enter project title"
        }
        if(!values.projectDescription){
            errors.projectDescription = "Enter project description"
        }
        return errors
    }

    render() {
        let { projectTitle, projectDescription}  = this.state
        return (
            <div>
                <div className="container">
                <div className="row d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-header-collor border-bottom shadow-sm header">
          <h3 className="col-6 mt-2 ml-5">Create or edit project</h3>
        </div>
                    <Formik 
                    initialValues={{projectTitle, projectDescription}}
                    onSubmit={this.onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}>
                    
                        {
                            (props) =>
                            <Form>
                                <ErrorMessage name="projectTitle" component="div" className="alert alert-warning" />
                                <ErrorMessage name="projectDescription" component="div" className="alert alert-warning" />
                                {/* <fieldset className="form-group">
                                    <label>Id</label>
                                    <Field className="form-control" type="text" name="id" disabled/>
                                </fieldset> */}
                                <fieldset className="form-group">
                                    <label>Project Title</label>
                                    <Field className="form-control" type="text" name="projectTitle"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Project Description</label>
                                    <Field className="form-control" type="text" name="projectDescription"/>
                                </fieldset>
                                <button className="btn btn-success" type="submit">Save</button>
                            </Form>
                        }
                    </Formik>
                </div>
            </div>
        );
    }
}

export default ProjectForm;