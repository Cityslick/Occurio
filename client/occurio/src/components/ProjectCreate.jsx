import React, { Component } from 'react';

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
      <form onSubmit={(e) => this.props.handleCreateProject(e,
        this.state.name,
        this.state.description,
        this.state.category,
        this.state.status,
        this.state.planned_start_date,
        this.state.planned_end_date
      )}>
        <label> Name
          <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleInputChange} />
        </label>
        <label> Description
          <input type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleInputChange} />
        </label>
        <label> Category
          <input type="text" name="category" placeholder="Category" value={this.state.category} onChange={this.handleInputChange} />
        </label>
        <label> Status
          <input type="text" name="status" placeholder="Status" value={this.state.status} onChange={this.handleInputChange} />
        </label>
        <label>Start Date
          <input type="text" name="planned_start_date" placeholder="Start Date" value={this.state.planned_start_date} onChange={this.handleInputChange} />
        </label>
        <label>Planned End Date
          <input type="text" name="planned_end_date" placeholder="End Date" value={this.state.planned_end_date} onChange={this.handleInputChange} />
        </label>
        <input type="submit" value="Create Project" />
      </form>
    </div>
  )
}
}

export default ProjectCreate;
