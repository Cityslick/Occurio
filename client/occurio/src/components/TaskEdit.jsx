import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class TaskEdit extends Component {
    constructor() {
        super();
        this.state = {
            user_id: 0,
            proj_id: null,
            task_id: null,
            name: '',
            description: '',
            start_date: '',
            end_date: '',
            act_start_date: '',
            act_end_date: '',
            status: '',
            ticket: '',
            user_type:'',
            task_id:0,
            collaboratorData:null,
            collaboratorDataLoaded:false,
            taskData: null,
            taskDataLoaded: false,
            fireRedirect:false,
        },
        this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlerLoadCollaborator = this.handlerLoadCollaborator.bind(this);
        this.getUserInfo=this.getUserInfo.bind(this);
        this.clearComponents= this.clearComponents.bind(this);
    }

    getUserInfo(){
        axios.get(`/user/id/${this.props.userData.id}`)
        .then(res => {
            this.setState({
                user_type: res.data.user.user_type,
            })
        } )
    }

  componentDidMount() {
    axios.get(`/task/${this.props.task_id}`)
    .then(res=>{
      this.handlerLoadCollaborator(res.data.data.proj_id);
      this.setState({
        user_id: res.data.data.user_id,
        task_id: res.data.data.id,
        proj_id: res.data.data.proj_id,
        name: res.data.data.name,
        description: res.data.data.description,
        start_date: res.data.data.start_datestr,
        end_date: res.data.data.end_datestr,
        act_start_date: res.data.data.act_start_datestr,
        act_end_date: res.data.data.act_end_datestr,
        status: res.data.data.status,
        ticket: res.data.data.ticket,
        taskData:res.data.data,
        taskDataLoaded: true,
      });
      this.getUserInfo();
    }).catch(err=>{
      console.log(err.json);
    })
  }

  handlerLoadCollaborator(proj_id){
    axios.get(`/project/id/${proj_id}`).then(res=>{
      this.setState({
        collaboratorData: res.data.data,
        collaboratorDataLoaded: true,
        })
    }).catch(err=>{
        console.log(err.json);
    })
  }

        handleTaskSubmit(e, user_id, task_id, name, description, start_date, end_date, act_start_date, act_end_date, status, ticket, user_type) {
        user_type=this.state.user_type;
        e.preventDefault();
        axios.put(`/task/${task_id}`, {
            task_id,
            name,
            user_id,
            description,
            start_date,
            end_date,
            act_start_date,
            act_end_date,
            status,
            ticket,
            user_type,
        }).then(()=>{
            this.setState({
                fireRedirect:true,
            })
            this.clearComponents();
        }).catch(err => console.log(err));

    }

    handleInputChange(e) {
        const name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value,
        });
    }

    clearComponents(){
        this.setState({
            name:"",
            description:"",
            ticket:"",
            start_date:"",
            start_date:"",
            status:"Pending",
        })
    }

    renderformNormalUser(){
        if (this.state.taskDataLoaded){
            return(
                <div  className="main-container">
                    <div className="sub-container">
                        <div >
                            <h1 className="hero-text2">Add a task to project</h1>
                        </div>
                        <form onSubmit={(e) => this.handleTaskSubmit(
                            e,
                            this.state.user_id,
                            this.state.task_id,
                            this.state.name,
                            this.state.description,
                            this.state.start_date,
                            this.state.end_date,
                            this.state.act_start_date,
                            this.state.act_end_date,
                            this.state.status,
                            this.state.ticket,
                            this.state.user_type
                            )}>

                            <div className="input-container">
                                <label>Name</label>
                                <h1 className="task-no-edit" >{this.state.name}  </h1>
                            </div>

                            <div className="input-container">
                                <label>Descripcion</label>
                                <h1 className="task-no-edit" >{this.state.description}</h1>
                            </div>

                            <div className="input-container 2">
                                <label>Planned start date</label>
                                <h1 className="task-no-edit"  >  {this.state.start_date} </h1>
                                <label>Planned end date </label>
                                <h1 className="task-no-edit"  >{this.state.end_date}  </h1>
                            </div>

                            <div className="input-container">
                                <label>Ticket</label>
                                <input  className="normal-input" type="text" name="ticket" id="ticket" value={this.state.ticket} placeholder="" onChange={this.handleInputChange} required/>
                            </div>
                            <div  className="input-container2" >
                                <label>Started date </label>
                                <input className="form" type="date" name="act_start_date" id="act_start_date" value={this.state.act_start_date} placeholder="" onChange={this.handleInputChange} />

                                <label>Ended date </label>
                                <input className="form" type="date" name="act_end_date" id="act_end_date" value={this.state.act_end_date} placeholder="" onChange={this.handleInputChange} />
                            </div>

                            <div className="dropdown-container" >
                                <label>Status</label>
                                <select name="status"   id="status"  value={this.state.status} onChange={this.handleInputChange}>
                                    <option name="status" key="1" value={"Done"}>Pending</option>
                                    <option name="status" key="2" value={"In progress"}>In progress</option>
                                    <option name="status" key="3"  value={"Canceled"}>Canceled</option>
                                </select>
                            </div>

                            <div>
                                <input className="form" type="submit" value="Enter" required/>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }else{
            <h1>Loading....</h1>
        }
    }
    renderFormSuperUser(){
        if (this.state.taskDataLoaded){
            return(
                <div  className="main-container">
                    <div className="sub-container">
                        <div >
                            <h1 className="hero-text2">Add a task to project</h1>
                        </div>
                        <form onSubmit={(e) => this.handleTaskSubmit(
                            e,
                            this.state.user_id,
                            this.state.task_id,
                            this.state.name,
                            this.state.description,
                            this.state.start_date,
                            this.state.end_date,
                            this.state.act_start_date,
                            this.state.act_end_date,
                            this.state.status,
                            this.state.ticket
                            )}>
                            <div className="dropdown-container">
                                <label className="labelInput">Collaborator</label>
                                <select id="user_id"  name="user_id" onChange={this.handleInputChange}  value={this.state.user_id} >
                              { (this.state.collaboratorDataLoaded) ?
                              this.state.collaboratorData.map((collaborator,index) => {
                                return <option key={collaborator.user_id_new} id={collaborator.username}
                                name="user_id"  value={collaborator.user_id_new} >{collaborator.username}</option>
                                })
                                : ""}
                                </select>
                            </div>

                            <div className="input-container" >
                                <label>Name</label>
                                <input className="normal-input" type="text" name="name" id="name" value={this.state.name} placeholder="" onChange={this.handleInputChange} required/>
                            </div>

                            <div  className="input-container">
                                <label>Description </label>
                                <textarea className="form" name="description" id="description" value={this.state.description} placeholder="" onChange={this.handleInputChange} required/>
                            </div>

                            <div className="input-container2">
                                <label>Planned start date </label>
                                <input className="form" type="date" name="start_date" id="start_date" value={this.state.start_date} placeholder="" onChange={this.handleInputChange} required/>

                                <label>Planned end date </label>
                                <input className="form" type="date" name="end_date" id="end_date" value={this.state.end_date} placeholder="" onChange={this.handleInputChange} required/>
                            </div>
                            <div className="input-container2">
                                <label>Started date </label>
                                <input className="form" type="date" name="act_start_date" id="act_start_date" value={this.state.act_start_date} placeholder="" onChange={this.handleInputChange} />

                                <label>Ended date </label>
                                <input className="form" type="date" name="act_end_date" id="act_end_date" value={this.state.act_end_date} placeholder="" onChange={this.handleInputChange} />
                            </div>

                            <div className="input-container">
                                <label>Ticket</label>
                                <input className="normal-input" type="text" name="ticket" id="ticket" value={this.state.ticket} placeholder="" onChange={this.handleInputChange} required/>
                            </div>

                            <div  className="dropdown-container">
                                <label>Status</label>
                                <select name="status"   id="status"  value={this.state.status} onChange={this.handleInputChange}>
                                    <option name="status" key="1" value={"Done"}>Pending</option>
                                    <option name="status" key="2" value={"In progress"}>In progress</option>
                                    <option name="status" key="3"  value={"Canceled"}>Canceled</option>
                                </select>
                            </div>

                            <div>
                                <input className="form" type="submit" value="Enter" required/>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }else{
          <h1>Loading....</h1>
        }
    }

    renderInfo(){
        if (this.state.taskDataLoaded){
            (this.state.taskData.user_type==="Manager")? this.renderFormSuperUser() : this.renderformNormalUser();
        }
    }

    render() {
        return(
            <div>
                {(this.state.user_type=="Manager") ? this.renderFormSuperUser() : this.renderformNormalUser()}
              {this.state.fireRedirect
                ? <Redirect push to={`/projectTask/${this.state.proj_id}`} />
                : ''}
            </div>
        )
    }
}

export default TaskEdit;
