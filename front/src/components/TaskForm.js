import React, { Component } from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import AxiosMethods from '../service/AxiosMethods.js';
import {Link} from 'react-router-dom';

class TaskForm extends Component {
    constructor(props){
        super(props)
        {console.log(props)}
        this.state = {
           projectId: this.props.match.params.id1,
            taskId: this.props.match.params.id2,
            taskTitle: "",
            taskDescription: "",
            taskPriority: "",
            taskStatus: ""
        }
    }

    componentDidMount(){
        console.log(this.state.taskId)
        console.log(this.state.projectId)
        if(this.state.taskId === -1){
            return
        }
        AxiosMethods.findByTaskId(this.state.projectId, this.state.taskId)
        .then(console.log(this.state))
        .then(res => this.setState({
            // projectId: res.data.projectId,
           // taskId: res.data.id,
            taskTitle: res.data.taskTitle,
            taskDescription: res.data.taskDescription,
            taskPriority: res.data.taskPriority,
            taskStatus: res.data.taskStatus
        }))
        .then(console.log(this.state));
    }

    onSubmit = (values) =>{
        
        let task = {
        // projectId: values.projectId,
            taskId: this.state.taskId,
            taskTitle: values.taskTitle,
            taskDescription: values.taskDescription,
            taskPriority: values.taskPriority,
            taskStatus: values.taskStatus
        }
        console.log(task)
        console.log(this.state)
       
        if (task.taskId === "-1"){
            AxiosMethods.addTask(this.state.projectId, task)
            .then(() => this.props.history.push(`/projects/id/${this.state.projectId}/tasks`))
            .then(console.log(values));
        }else{
            AxiosMethods.updateTask(task, this.state.projectId, this.state.taskId)
            .then(() => this.props.history.push(`/projects/id/${this.state.projectId}/tasks`))  
            .then(console.log(values));
        }
        

    }

    validate = (values) =>{
        let errors = {}
        if(!values.taskTitle){
            errors.taskTitle = "Enter task title"
        }
        if(!values.taskDescription){
            errors.taskDescription = "Enter task description"
        }
        return errors
    }

    render() {
        let { taskId, taskTitle, taskDescription, taskPriority, taskStatus}  = this.state
        return (
            <div>
                
                <div className="row container-fluid d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-nav-color border-bottom shadow-sm header">
          <h3 className="col-6 mt-2 ml-5">Create or edit task</h3>
        </div>
        <div className="container">
                    <Formik 
                    initialValues={{ taskId, taskTitle, taskDescription, taskPriority, taskStatus}}
                    onSubmit={this.onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}>
                    
                        {
                            (props) =>
                            <Form>
                                <ErrorMessage name="taskTitle" component="div" className="alert alert-warning" />
                                <ErrorMessage name="taskDescription" component="div" className="alert alert-warning" />
                                {/* <fieldset className="form-group">
                                    <label>Id</label>
                                    <Field className="form-control" type="text" name="taskId" disabled/>
                                </fieldset> */}
                                <fieldset className="form-group">
                                    <label>Task Title</label>
                                    <Field className="form-control" type="text" name="taskTitle"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Task Description</label>
                                    <Field className="form-control" type="text" name="taskDescription"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    
                                <label>Task Priority</label>
                                    <Field as="select" name="taskPriority" className="ml-3" >
                                         <option value="LOW">Low</option>
                                         <option value="MEDIUM">Medium</option>
                                         <option value="HIGH">High</option>
                                    </Field>
                                 </fieldset>
                                 <fieldset className="form-group">
                                 <label>Task Status</label>
                                     <Field as="select" name="taskStatus" className="ml-3" >
                                        <option value="NOT_STARTED">New</option>
                                        <option value="IN_PROGRESS">In progress</option>
                                        <option value="DONE">Done</option>
                                    </Field>
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

export default TaskForm;