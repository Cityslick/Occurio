
import React, { Component } from 'react';
import axios from 'axios';
import UserProfileAll from "./UserProfileAll";

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
      projectData:null,
      projectDataLoaded:false,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoadProjects = this.handleLoadProjects.bind(this);
  }

  componentDidMount(){
    this.handleLoadProjects();
  }

  handleLoadProjects(){
    let filter="";
    axios.get("/project",{
       filter,
    })
    .then(res=>{
      this.setState({
        projectData: res.data.data,
        projectDataLoaded: true,
      })
    }).catch(err=>{
      console.log(err.json);
    })

  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value

    });
  }


  allProjects(){
    return(
      <select>
        { (this.state.projectDataLoaded) ?
        this.state.projectData.map(project => {
          return <option key={project.id}>{project.name}</option>
        })
       : ""}
      </select>
      )
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
              <UserProfileAll/>
            </div>
            <div className='list'>
              {this.allProjects()}
            </div>

            <div>
              <input className="form" type="text" name="name" value={this.state.name} placeholder="What's your task name?" onChange={this.handleInputChange} />
            </div>

            <div>
              <textarea className="form" name="description" value={this.state.description} placeholder="Add a description" onChange={this.handleInputChange} />
            </div>

            <div>
              <input className="form" type="date" name="start_date" value={this.state.start_date} placeholder="Start Date?" onChange={this.handleInputChange} />
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
        </div>
      </div>
    )

  }

}

export default Task;
