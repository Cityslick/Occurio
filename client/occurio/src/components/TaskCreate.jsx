import React, { Component } from 'react';
import axios from 'axios';
import {
  Link
} from 'react-router-dom';
import '../App.css';

class TaskList extends Component {
  constructor() {
    super();
    // state
    this.state = {
      user_id: null,
      proj_id: null,
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      status: 'Pending',
      ticket: '',
      task_id:0,
      collaboratorData:null,
      collaboratorDataLoaded:false,
      taskData: null,
      taskDataLoaded: false,
      mainDataLoad:false,
    },
    this.renderTaskList =this.renderTaskList.bind(this);
    this.handlerDeleteTask = this.handlerDeleteTask.bind(this);
    this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clearComponents= this.clearComponents.bind(this);
    this.handlerLoadCollaborator = this.handlerLoadCollaborator.bind(this);
  }

  componentDidMount() {
    this.setState({
      proj_id:this.props.proj_id,
      mainDataLoad:true,
    })
    this.handlerReloadList();
    this.handlerLoadCollaborator();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.task_id != this.state.task_id ) {
      this.handlerReloadList();
    }
  }

  clearComponents(){
    document.getElementById("name").value="";
    document.getElementById("description").value="";
    document.getElementById("ticket").value="";
    document.getElementById("start_date").value="";
    document.getElementById("end_date").value="";
  }

  handlerLoadCollaborator(){
    let proj_id=this.props.proj_id;
     axios.get(`/project/id/${proj_id}`).then(res=>{
      if(res.data.data.length>0){
        console.log(res.data.data);
        this.setState({
          collaboratorData: res.data.data,
          user_id:res.data.data[0].user_id_new,
          collaboratorDataLoaded: true,
        })
      }
    }).catch(err=>{
      console.log(err.json);
    })
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
      this.clearComponents();
      this.setState({
        taskData: res.data.data,
        task_id:  res.data.data.id,
        taskDataLoaded:false,
      })
    }).catch(err => console.log(err));

  }

  handleInputChange(e) {
    const name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value,
    });
  }

  handlerReloadList() {
    let proj_id=this.props.proj_id;
    let user_id=this.state.user_id;
    let filter="";
    axios.post(`/task/${proj_id}`,{
       proj_id,
       user_id,
       filter,
    })
    .then(res=>{
      this.setState({
        taskData: res.data.data,
        taskDataLoaded: true,
      })
    }).catch(err=>{
      console.log(err.json);
    })
  }

  handlerDeleteTask(task_Id){
    axios.delete(`/task/${task_Id}`)
    .then(()=>{
      this.handlerReloadList();
    })
    .catch(err=>{
      console.log(err);
    })
  }
  //task list
  renderTaskList() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Ticket</th>
              <th>Status</th>
              <th>Collaborator</th>
            </tr>
          </thead>
          <tbody>
          {(this.state.taskDataLoaded) ?
            this.state.taskData.map((task,index) => {
              return <tr key={task.id}>
                <td>{index}</td>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.start_datestr}</td>
                <td>{task.end_datestr}</td>
                <td>{task.ticket}</td>
                <td>{task.status}</td>
                <td>{task.fullname}</td>
                <td><Link to={`/TaskEdit/${task.id}`}><input type="submit" value="Edit"/></Link></td>
                <td><input type="submit" value="Delete" onClick={()=>{this.handlerDeleteTask(task.id)}} /></td>
               </tr>
          })
          : ""}

          </tbody>
        </table>
      </div>
    );
  }

  renderSubmitform(){
    return(
      <div className="edit-task-form">
        <div className="edit-form">
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
            <div className="edit-task-input">
              <div>
                <label className="labelInput">Collaborator</label>
                <select id="user_id"  name="user_id" onChange={this.handleInputChange} >
                  { (this.state.collaboratorDataLoaded) ?
                  this.state.collaboratorData.map((collaborator,index) => {
                    return <option key={collaborator.user_id_new} id={collaborator.username}
                    name="user_id"  value={collaborator.user_id_new} >{collaborator.user_id_new} {collaborator.username}</option>
                  })
                : ""}
                </select>
              </div>

              <div className="task-input">
                <label className="labelInput" >Name </label>
                <input type="text" name="name" id="name" value={this.state.name} placeholder="" onChange={this.handleInputChange}  required/>
              </div>

              <div className="task-input">
                <label className="labelInput" >Description </label>
                <textarea name="description" id="description" value={this.state.description} placeholder="" onChange={this.handleInputChange} required />
              </div>

              <div className="task-input">
                <label className="labelInput" >Planned start date </label>
                <input type="date" name="start_date" id="start_date" value={this.state.start_date} placeholder="" onChange={this.handleInputChange} required />

                <label className="labelInput" >Planned end date </label>
                <input type="date" name="end_date" id="end_date" value={this.state.end_date} placeholder="" onChange={this.handleInputChange} required />
              </div>

              <div>
                <label className="labelInput">Status</label>
                <select name="status"   id="status"  onChange={this.handleInputChange}>
                  <option name="status" key="1" value={"Done"}>Pending</option>
                  <option name="status" key="2" value={"In progress"}>In progress</option>
                  <option name="status" key="3"  value={"Canceled"}>Canceled</option>
                </select>
              </div>

              <div>
                <label className="labelInput" >Ticket</label>
                <input type="text" name="ticket" id="ticket" value={this.state.ticket} placeholder="" onChange={this.handleInputChange}  required/>
              </div>
              <div>
                  <input type="submit" value="Submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }

  render() {
    return(
      <div>
        {this.renderSubmitform()}
        {this.renderTaskList()}
      </div>
    )
  }
}

export default TaskList;
