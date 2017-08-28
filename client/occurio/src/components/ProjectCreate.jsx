import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import axios from 'axios';


class ProjectCreate extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      category: 'Administrative',
      status: 'Pending',
      planned_start_date: '',
      planned_end_date: '',
      act_start_date: '',
      act_end_date: '',
      user_id:null,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCreateProject= this.handleCreateProject.bind(this);
    this.clearComponents=this.clearComponents.bind(this);
  }

  clearComponents(){
    this.setState({
      name: '',
      description: '',
      category: 'Administrative',
      status: 'Pending',
      planned_start_date: '',
      planned_end_date: '',
      act_start_date: '',
      act_end_date: '',
    })

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
      this.clearComponents();
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
      <div >
        <div className="project-page">
          <div className>
            <h1 className="hero-text2">Create a Project</h1>
          </div>
          <form onSubmit={(e) => this.handleCreateProject(e,
            this.state.name,
            this.state.description,
            this.state.category,
            this.state.status,
            this.state.planned_start_date,
            this.state.planned_end_date
          )}>
            <div className="name-input">
              <label>NAME</label>
              <input type="text" name="name" placeholder="" value={this.state.name} onChange={this.handleInputChange} required />
            </div>
            <div className="desc-input">
            <label>DESCRIPTION</label>
              <textarea name="description" value={this.state.description} onChange={this.handleInputChange} required />
            </div>
            <div className="cat-input">
              <label>CATEGORY</label>
              <select className="select" name="category" value={this.state.category} onChange={this.handleInputChange} required>
                <option>Administrative</option>
                <option>Design</option>
                <option>Back End</option>
                <option>Front End</option>
              </select>
            </div>
            <div className="status-input">
              <label> STATUS </label>
              <select  className="select" name="status" value={this.state.status} onChange={this.handleInputChange} required>
                <option>Pending</option>
                <option>Started</option>
                <option>Complete</option>
              </select>
            </div>
            <div className="date-input">
              <label>Start Date </label>
              <input type="date" name="planned_start_date" placeholder="Start Date" value={this.state.planned_start_date} onChange={this.handleInputChange} required />
              <label>End Date </label>
              <input type="date" name="planned_end_date" placeholder="End Date" value={this.state.planned_end_date} onChange={this.handleInputChange} required />
            </div>
            <div>
              <input type="submit" value="Create" />
            </div>
          </form>
        </div>
      </div>
    )
}
}

export default ProjectCreate;
