import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import axios from 'axios';


class ProjectCreate extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      category: '',
      status: '',
      planned_start_date: '',
      planned_end_date: '',
      act_start_date: '',
      act_end_date: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCreateProject= this.handleCreateProject.bind(this);
  }

  handleCreateProject(e, name, description, category, status, planned_start_date, planned_end_date) {
    e.preventDefault();
    console.log("Im here");
    axios.post('/project', {
      name,
      description,
      category,
      status,
      planned_start_date,
      planned_end_date,
    }).then(res => {
      this.setState({
        user: res.data.user,
        project: res.data,
        fireRedirect: true,
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

  render() {
    return (
      <div className="project-create">
        <form onSubmit={(e) => this.handleCreateProject(e,
          this.state.name,
          this.state.description,
          this.state.category,
          this.state.status,
          this.state.planned_start_date,
          this.state.planned_end_date
        )}>
          <label>
            <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleInputChange} required />
          </label>
          <label>
            <input type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleInputChange} required />
          </label>
          <label>
            <select name="category" value={this.state.category} onChange={this.handleInputChange} required>
              <option>Administrative</option>
              <option>Design</option>
              <option>Back End</option>
              <option>Front End</option>
            </select>
          </label>
          <label>
            <select name="status" value={this.state.status} onChange={this.handleInputChange} required>
              <option>Started</option>
              <option>Pending</option>
              <option>Complete</option>
            </select>
          </label>
          <label>
            <input type="date" name="planned_start_date" placeholder="Start Date" value={this.state.planned_start_date} onChange={this.handleInputChange} required />
          </label>
          <label>
            <input type="date" name="planned_end_date" placeholder="End Date" value={this.state.planned_end_date} onChange={this.handleInputChange} required />
          </label>
          <input type="submit" value="Create Project" />
        </form>
      </div>
    )
}
}

export default ProjectCreate;
