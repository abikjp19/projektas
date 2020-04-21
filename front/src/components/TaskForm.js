import React, { Component } from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import AxiosMethods from '../service/AxiosMethods.js';

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
        if(this.state.taskId === -1){
            return
        }
        AxiosMethods.findByTaskId(this.state.projectId, this.state.taskId)
        .then(res => this.setState({
            // projectId: res.data.projectId,
            taskId: res.data.id,
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
            // taskId: values.taskId,
            taskTitle: values.taskTitle,
            taskDescription: values.taskDescription,
            taskPriority: values.taskPriority,
            taskStatus: values.taskStatus
        }
        if(this.state.taskId == -1){
            AxiosMethods.addTask(task, this.state.projectId)
            .then(() => this.props.history.push(`/projects/id/${this.state.projectId}/tasks`))
        
            // kazkur turi buti projectId?
        }else{
            AxiosMethods.updateTask(this.state.projectId, this.state.taskId, task)
            .then(() => this.props.history.push(`/projects/id/${this.state.projectId}/tasks/id/${this.state.taskId}`))  
        }
        console.log(values);

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
        let { taskTitle, taskDescription, taskPriority, taskStatus}  = this.state
        return (
            <div>
                <h5>Add / Edit Task</h5>
                <div className="container">
                    <Formik 
                    initialValues={{taskTitle, taskDescription, taskPriority, taskStatus}}
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
                                    <Field className="form-control" type="text" name="id" disabled/>
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
                                    <Field className="form-control" type="text" name="taskPriority"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Task Status</label>
                                    <Field className="form-control" type="text" name="taskStatus"/>
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