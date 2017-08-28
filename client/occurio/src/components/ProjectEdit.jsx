import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
class ProjectEdit extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      category: '',
      status: '',
      planned_start_date: '',
      planned_end_date: '',
      project:null,
      projectDataLoaded: false,
      fireRedirect: false,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEditProject = this.handleEditProject.bind(this);
    this.renderEditProject= this.renderEditProject.bind(this)
  }
  componentDidMount() {
      axios.get(`/project/${this.props.id}`)
        .then((res) => {
          this.setState({
            name: res.data.data.name,
            description: res.data.data.description,
            category: res.data.data.category,
            status: res.data.data.status,
            planned_start_date: res.data.data.planned_start_datestr,
            planned_end_date:res.data.data.planned_end_datestr,
            project: res.data.data,
            projectDataLoaded: true,
          })
        }).catch(err => console.log(err));
    }
  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }
  // Handle Edit Project
  handleEditProject(e, name, description, category, status, planned_start_date, planned_end_date) {
    e.preventDefault();
    axios.put(`/project/${this.props.id}`, {
      name,
      description,
      category,
      status,
      planned_start_date,
      planned_end_date,
    }).then(res => {
      console.log(res);
      this.setState({
        project: res.data.data,
        fireRedirect: true,
      })
    }).catch(err =>{
       console.log(err);
     })
  }

  renderEditProject() {
    if (this.state.projectDataLoaded) {
      return (
        <div>
        <h1>Edit Project</h1>
        <form onSubmit={(e) => this.handleEditProject(e,
          this.state.name,
          this.state.description,
          this.state.category,
          this.state.status,
          this.state.planned_start_date,
          this.state.planned_end_date
        )}>
          <label> Name
            <input type="text" name="name"  value={this.state.name} onChange={this.handleInputChange} required />
          </label>
          <label> Description
            <input type="text" name="description"  value={this.state.description} onChange={this.handleInputChange} required />
          </label>
          <label> Category
            <select name="category" value={this.state.category} onChange={this.handleInputChange} required>
              <option>Administrative</option>
              <option>Design</option>
              <option>Back End</option>
              <option>Front End</option>
            </select>
          </label>
          <label> <br/>Status
            <select name="status" value={this.state.status} onChange={this.handleInputChange} required>
              <option>Pending</option>
              <option>Started</option>
              <option>Complete</option>
            </select>
          </label>
          <label> <br/>Start Date
            <input type="date" name="planned_start_date" placeholder="Start Date" value={this.state.planned_start_date} onChange={this.handleInputChange} required />
          </label>
          <label> <br/>End Date
            <input type="date" name="planned_end_date" placeholder="End Date" value={this.state.planned_end_date} onChange={this.handleInputChange} required />
          </label>
          <input type="submit" value="Update Project" />
        </form>
        </div>
      )
    }
  }
  render() {
    return (
      <div className="project-create">
        {this.renderEditProject()}
        {this.state.fireRedirect
          ? <Redirect push to={`/projectList/${this.props.id}`} />
          : ''}
      </div>
    )
  }
}
export default ProjectEdit;
