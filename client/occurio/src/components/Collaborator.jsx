
import React, { Component } from 'react';
import axios from 'axios';
import ProjectView from "./ProjectView";

class Collaborator extends Component {
  constructor() {
    super();
    this.state = {
      user_id: null,
      proj_id: null,
      collaboratorListData:null,
      collaboratorListDataLoaded:false,
      collaboratorData:null,
      collaboratorDataLoaded:false,
      projectData:null,
      projectDataLoaded:false,
    }
    this.handleCollaboratorSubmit = this.handleCollaboratorSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlerLoadCollaborator = this.handlerLoadCollaborator.bind(this);
    this.handlerLoadProject = this.handlerLoadProject.bind(this);
    this.handlerCollaboratorList= this.handlerCollaboratorList.bind(this);
    this.renderCollaboratorList=this.renderCollaboratorList.bind(this);
    this.hadlerDelete=this.hadlerDelete.bind(this);
  }

  componentDidMount(){
    this.handlerLoadCollaborator();
    this.handlerLoadProject();
  }

  handleCollaboratorSubmit(e, user_id, proj_id) {
    e.preventDefault();
    axios.post('/collaborator', {
      user_id,
      proj_id,
    }).then(res => {
      this.handlerCollaboratorList();
      this.setState({
        collaborator: res.data.data,
      })
    }).catch(err => console.log(err));
  }

  hadlerDelete(collaborator_Id){
    axios.delete(`collaborator/${collaborator_Id}`)
    .then(()=>{
      this.renderCollaboratorList();
    })
    .catch(err=>{
      console.log(err);
    })
  }

  handlerLoadCollaborator(){
    let proj_id=this.state.proj_id;
    let user_id=this.state.user_id;
     axios.put(`/collaborator`,{
        proj_id,
        user_id,
     }).then(res=>{
      if(res.data.data.length>0){
        this.setState({
          collaboratorData: res.data.data,
          user_id:res.data.data[0].id,
          collaboratorDataLoaded: true,
        })
      }
    }).catch(err=>{
      console.log(err.json);
    })
  }

  handlerCollaboratorList(){
    let proj_id=this.state.proj_id;
    axios.get(`/collaborator/${proj_id}`)
    .then(res=>{
      console.log(res.data.data);
      if(res.data.data.length>0){
        this.setState({
          collaboratorListData: res.data.data,
          collaboratorListDataLoaded: true,
        })
      }
    }).catch(err=>{
      console.log(err.json);
    })
  }

  handlerLoadProject(){
    axios.get(`/project`)
    .then(res=>{
      if(res.data.data.length>0){
        this.setState({
          projectData: res.data.data,
          proj_id:res.data.data[0].id,
          projectDataLoaded: true,
        })
      }
    }).catch(err=>{
      console.log(err.json);
    })
  }

  renderCollaboratorList() {
    return (
      <div className="List">
        {(this.state.collaboratorListDataLoaded) ?
          this.state.collaboratorListData.map((collaborator,index) => {
            return <div key={collaborator.userid} name="collaborator"  value={collaborator.id} >
                      <h1>{collaborator.fullname}</h1>
                     <input key={index} type="submit" value="Delete"  onClick={this.hadlerDelete(collaborator.userId)}/>
                   </div>
        })
        : ""}
      </div>
    );
  };

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
    if (name=="proj_id"){
      this.handlerLoadCollaborator();
      this.handlerCollaboratorList();
    }
    console.log("value " +value ,"state"+ this.state.proj_id)
  }

  render(){

    return(
      <div className="collaborator-page">
        <div className="xx">
          <h2>Assing Collaborators</h2>
          <h2>Assing Collaborators</h2>
          <h2>Assing Collaborators</h2>
          <h2>Assing Collaborators</h2>
          <h2>Assing Collaborators</h2>
          <h2>Assing Collaborators</h2>
          <h2>Assing Collaborators</h2>
          <h2>Assing Collaborators</h2>
        </div>
        <div className="form">
          <form onSubmit={(e) => this.handleCollaboratorSubmit(
              e,
              this.state.user_id,
              this.state.proj_id
            )}>
            <div>
              <label className="labelInput">Projects</label>
              <select id="proj_id"  name="proj_id" onChange={this.handleInputChange}>
                { (this.state.projectDataLoaded) ?
                this.state.projectData.map((project,index) => {
                  return <option key={project.id} name="proj_id"  value={project.id} >{project.id} {project.name}</option>
                })
               : ""}
              </select>
            </div>
            <div>
              <label className="labelInput">Collaborator</label>
              <select id="user_id"  name="user_id" onChange={this.handleInputChange}>
                { (this.state.collaboratorDataLoaded) ?
                this.state.collaboratorData.map((collaborator,index) => {
                  return <option key={collaborator.id}
                  name="user_id"  value={collaborator.id} >{collaborator.id} {collaborator.username}</option>
                })
               : ""}
              </select>
            </div>
            <div>
                <input className="form" type="submit" value="Submit" onClick={()=>{alert("jjji")}}/>
            </div>
            {this.renderCollaboratorList()}
          </form>
        </div>
      </div>
    )

  }

}

export default Collaborator;
