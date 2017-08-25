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
      user_id:null,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCreateProject= this.handleCreateProject.bind(this);
  }

  handleCreateProject(e, name, description, category, status, planned_start_date, planned_end_date) {
    e.preventDefault();
    let user_id=this.props.user.id;
    axios.post('/project', {
      name,
      description,
      category,
      status,
      planned_start_date,
      planned_end_date,
      user_id,
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
        <div className="project-page">
        <div className>
          <h1 className="hero-text2">Create a Project!</h1>
        </div>
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
          <div>
          <label>
            <select className="select" name="category" value={this.state.category} onChange={this.handleInputChange} required>
              <option>Administrative</option>
              <option>Design</option>
              <option>Back End</option>
              <option>Front End</option>
            </select>
          </label>
          <label>
            <select className="select" name="status" value={this.state.status} onChange={this.handleInputChange} required>
              <option>Started</option>
              <option>Pending</option>
              <option>Complete</option>
            </select>
          </label>
          </div>
          <label>
            <input type="date" name="planned_start_date" placeholder="Start Date" value={this.state.planned_start_date} onChange={this.handleInputChange} required />
          </label>
          <label>
            <input type="date" name="planned_end_date" placeholder="End Date" value={this.state.planned_end_date} onChange={this.handleInputChange} required />
          </label>
          <div>
          <input className="select" type="submit" value="Create Project" />
          </div>
        </form>
        </div>
      </div>
    )
}
}

export default ProjectCreate;
