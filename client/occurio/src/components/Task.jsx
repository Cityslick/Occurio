import React, { Component } from 'react';

class Task extends Component {
  constructor() {
    super();
    this.state = {
      user_id: '',
      proj_id: '',
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      status: '',
      ticket: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value

    });
    console.log(value);
  }

  render(){
    return(
      <div>
        <div>
          <h2>Create a Task</h2>
        </div>
        <div className="form">
          <form onSubmit={(e) => this.props.handleTaskSubmit(
            e,
            this.state.user_id,
            this.state.proj_id,
            this.state.name,
            this.state.description,
            this.state.start_date,
            this.state.end_date,
            this.state.status,
            this.state.ticket
          )}>
            <div>
            <input className="form" type="text" name="user_id" value={this.state.user_id} placeholder="User Id" onChange={this.handleInputChange} />
            </div>
            <div>
            <input className="form" type="text" name="proj_id" value={this.state.proj_id} placeholder="Proj Id" onChange={this.handleInputChange} />
            </div>
            <div>
            <input className="form" type="text" name="name" value={this.state.name} placeholder="What's your task name?" onChange={this.handleInputChange} />
            </div>
            <div>
            <input className="form" type="text" name="description" value={this.state.description} placeholder="Add a description" onChange={this.handleInputChange} />
            </div>
            <div>
            <input className="form" type="date" name="start_date" value={this.state.start_date} placeholder="Start Date?" onChange={this.handleInputChange} />
            </div>
            <div>
            <input className="form" type="date" name="end_date" value={this.state.end_date} placeholder="End Date?" onChange={this.handleInputChange} />
            </div>
            <div>
            <input className="form" type="text" name="status" value={this.state.status} placeholder="What's the status?" onChange={this.handleInputChange} />
            </div>
            <div>
            <input className="form" type="text" name="ticket" value={this.state.ticket} placeholder="Ticket" onChange={this.handleInputChange} />
            </div>
            <div>
            <input className="form" type="submit" value="Enter" />
            </div>
          </form>
          <h1>
            Let's get started!
          </h1>
        </div>
      </div>
    )
  
  }

}

export default Task;