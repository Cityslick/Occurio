
import React, { Component } from 'react';
import axios from 'axios';
import ProjectView from "./ProjectView";
import TaskList from './TaskList';

class Task extends Component {
  constructor() {
    super();
    this.state = {
      user_id: '',
      proj_id: 1,
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      status: '',
      ticket: '',
      collaboratorData:null,
      collaboratorDataLoaded:false,
    }
    this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlerLoadCollaborator = this.handlerLoadCollaborator.bind(this);
  }

  componentDidMount(){
    console.log(this.props);
    this.setState({
      proj_id:'1',
    })
    this.handlerLoadCollaborator();
  }

  handleTaskSubmit(e, user_id, proj_id, name, description, start_date, end_date, status, ticket) {
    e.preventDefault();
    axios.post('/task', {
      user_id,
      proj_id,
      name,
      description,
      start_date,
      end_date,
      status,
      ticket,
    }).then(res => {
      console.log(res);
      this.setState({
        task: res.data.task,
      })
    }).catch(err => console.log(err));
  }

  handlerLoadCollaborator(){
    let filter="";
    axios.get(`/collaborator/${this.state.proj_id}`)
    .then(res=>{
      this.setState({
        collaboratorData: res.data.data,
        collaboratorDataLoaded: true,
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
    console.log(value);
  }

  allProjects(){
    return(
      <select>
        { (this.state.collaboratorDataLoaded) ?
        this.state.collaboratorData.map(collaborator => {
          return <option key={collaborator.id}>{collaborator.username}</option>
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
          <form onSubmit={(e) => this.handleTaskSubmit(
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
            <ProjectView id={this.state.proj_id}  presentDetail={false}/>
            <div>
              <label className="labelInput">Collaborator</label>
              <select  name="user_id" onChange={this.handleInputChange}>
                { (this.state.collaboratorDataLoaded) ?
                this.state.collaboratorData.map(collaborator => {
                  return <option key={collaborator.userid}
                  name="user_id"  value={collaborator.userid} > {collaborator.username}</option>
                })
               : ""}
              </select>

            </div>

            <div>
              <label className="labelInput" >Name </label>
              <input className="form" type="text" name="name" value={this.state.name} placeholder="" onChange={this.handleInputChange} />
            </div>

            <div>
              <label className="labelInput" >Descripcion </label>
              <textarea className="form" name="description" value={this.state.description} placeholder="" onChange={this.handleInputChange} />
            </div>

            <div>
              <label className="labelInput" >Planned start date </label>
              <input className="form" type="date" name="start_date" value={this.state.start_date} placeholder="" onChange={this.handleInputChange} />

              <label className="labelInput" >Planned end date </label>
              <input className="form" type="date" name="end_date" value={this.state.end_date} placeholder="" onChange={this.handleInputChange} />
            </div>

            <div>
              <label className="labelInput">Status</label>
              <select name="status"  onChange={this.handleInputChange}>
                <option name="status" key="1" value={"Pending"}>Pending</option>
                <option name="status" key="2" value={"Done"}>Pending</option>
                <option name="status" key="3" value={"In progress"}>In progress</option>
                <option name="status" key="4"  value={"Canceled"}>Canceled</option>
              </select>
            </div>

            <div>
              <label className="labelInput" >Ticket</label>
              <input className="form" type="text" name="ticket" value={this.state.ticket} placeholder="" onChange={this.handleInputChange} />
            </div>
            <div>
                <input className="form" type="submit" value="Enter" />
            </div>
            <div>
              <TaskList proj_id={this.state.proj_id} user_id={0}  proj={true} />
            </div>
          </form>
        </div>
      </div>
    )

  }

}

export default Task;
