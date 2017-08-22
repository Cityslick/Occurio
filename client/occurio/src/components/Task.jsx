import React, { Component } from 'react';

class Task extends Component {
  constructor() {
    super();
    this.state = {
      // needs review
      id: '',
      user_id: '',
      desc: '',
      start_date: '',
      end_date: '',
      status: null,
      ticket: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value

    // const id = e.target.id;
    // const user_id = e.target.value;
    // // we should add a row for task names in DB
    // const taskname = e.target.taskname;

    // const desc = e.target.desc;
    // const start_date = e.target.start_date;
    // const end_date = e.target.end_date;
    // const status = e.target.status;
    // const ticket = e.target.ticket;
    // this.setState({
    // //   name: null,
    });
  }

  render(){
    return(
      <div>
        <div>
          <h2>Create a Task</h2>
        </div>
        <div className="form">
          <form onSubmit={(e) => this.props.handleLoginSubmit(
            e,
            this.state.id,
            this.state.user_id,
            this.state.name,
            this.state.description,
            this.state.start_date,
            this.state.end_date,
            this.state.status,
            this.state.ticket
          )}>
            <div>
            <input className="form" type="text" name="name" value={this.state.name} placeholder="What's your task name?" onChange={this.handleInputChange} />
            </div>
            <div>
            <input className="form" type="text" name="desc" value={this.state.desc} placeholder="Add a description" onChange={this.handleInputChange} />
            </div>
            <div>
            <input className="form" type="text" name="start_date" value={this.state.start_date} placeholder="Start Date?" onChange={this.handleInputChange} />
            </div>
            <div>
            <input className="form" type="text" name="end_date" value={this.state.end_date} placeholder="End Date?" onChange={this.handleInputChange} />
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