
import React, { Component } from 'react';
import axios from 'axios';

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
      this.setState({
        collaborator: res.data.data,
      })
    }).catch(err => console.log(err));
  }

  handlerLoadCollaborator(){
    // console.log("handlerLoadCollaborator");
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

  handlerCollaboratorList(proj_id){
      // console.log(" handlerCollaboratorList proj_id=",proj_id)
    axios.get(`/collaborator/${this.state.proj_id}`)
    .then(res=>{
      if(res.data.data.length>0){
        console.log(res.data.data, "----",proj_id);
        this.setState({
          collaboratorListData: res.data.data,
          collaboratorListDataLoaded: true,
        })
      }
    }).catch(err=>{
      console.log(err.json);
    })
  }

  hadlerDelete(proj_id,user_id){
    axios.post(`collaborator/${user_id}`,{
        proj_id,
        user_id,
    })
    .then(()=>{
      this.renderCollaboratorList();
    })
    .catch(err=>{
      console.log(err);
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
            //console.log(collaborator);
            return <div key={collaborator.userid} name="collaborator"  value={collaborator.id} >
                      <h1>{collaborator.fullname}</h1>
                      <span  onClick={() => this.hadlerDelete(collaborator.id,collaborator.userid)}>Delete</span>
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
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.proj_id != this.state.proj_id ) {
      console.log(nextState.proj_id );
      this.handlerCollaboratorList(nextState.proj_id );
    }
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
              <select id="proj_id"  name="proj_id" onChange={this.handleInputChange} >
                { (this.state.projectDataLoaded) ?
                this.state.projectData.map((project,index) => {
                  return <option key={project.id} name="proj_id"  value={project.id} >{project.id} {project.name}</option>
                })
               : ""}
              </select>
            </div>
            <div>
              <label className="labelInput">Collaborator</label>
              <select id="user_id"  name="user_id" onChange={this.handleInputChange} >
                { (this.state.collaboratorDataLoaded) ?
                this.state.collaboratorData.map((collaborator,index) => {
                  return <option key={collaborator.id}
                  name="user_id"  value={collaborator.id} >{collaborator.id} {collaborator.username}</option>
                })
               : ""}
              </select>
            </div>
            <div>
                <input className="form" type="submit" value="Submit" />
            </div>
          </form>
          {this.renderCollaboratorList()}
        </div>
      </div>
    )
  }
}

export default Collaborator;
