
import React, { Component } from 'react';
import axios from 'axios';

class Collaborator extends Component {
    constructor() {
        super();
        this.state = {
            user_id: 0,
            proj_id: 0,
            new_id: null,
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
        if (this.props.proj_id){
            this.setState({
                proj_id:this.props.proj_id,
            })
        }else{
            this.handlerLoadProject();
        }
    }

    componentWillUpdate(nextProps,nextState) {
        if (nextState.collaboratorListDataLoaded != this.state.collaboratorListDataLoaded || nextState.proj_id != this.state.proj_id || nextState.user_id !=this.state.user_id ) {
            axios.get(`/collaborator/${nextState.proj_id}`)
            .then(res=>{
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
    }

    handleCollaboratorSubmit(e, user_id, proj_id) {
        e.preventDefault();
        axios.post('/collaborator', {
            user_id,
            proj_id,
        }).then(res => {
            this.setState({
                collaboratorListDataLoaded:false,
            })
            this.handlerCollaboratorList();
        }).catch(err => console.log(err));
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        });
    }


    handlerCollaboratorList(){
        axios.get(`/collaborator/${this.state.proj_id}`)
        .then(res=>{
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

    hadlerDelete(proj_id,user_id){
        axios.post(`/collaborator/${user_id}`,{
            proj_id,
            user_id,
        })
        .then(()=>{
            this.setState({
                collaboratorListDataLoaded:false,
            })
            this.handlerCollaboratorList();
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
            <div className="collaborators-list">
                <div className="info-title">
                    <h1 className="sub-header">List of current collaborators</h1>
                </div>
                <div  className="collaborator-list-header">
                    <div  className="collaborator-name" >
                        <h1 className="collaborator-info" >Name</h1>
                    </div>
                    <div  className="collaborator-button" >

                    </div>
                </div>

                {(this.state.collaboratorListDataLoaded) ?
                    this.state.collaboratorListData.map((collaborator,index) => {
                    return <div className="collaborator-list-detail" key={collaborator.userid} name="collaborator"  value={collaborator.id} >
                                <div className="collaborator-name">
                                    <h1 className="collaborator-info">{collaborator.fullname}</h1>
                                </div>
                                <div className="collaborator-button">
                                    <input   className="small-button" type="submit" value="Delete" onClick={() => this.hadlerDelete(collaborator.id,collaborator.userid)} />
                                </div>
                            </div>
                    })
                : ""}
            </div>
        );
    };

    renderProjectList(){
        if (!this.props.proj_id){
            return (
                <div className="register">
                    <label className="labelInput">Projects</label>
                    <select id="proj_id"  name="proj_id" onChange={this.handleInputChange}  >
                        { (this.state.projectDataLoaded) ?
                            this.state.projectData.map((project,index) => {
                                return <option key={project.id} name="proj_id"  value={project.id} >{project.id} {project.name}</option>
                            })
                        : ""}
                    </select>
                </div>
            )
        }
    }

    render(){

        return(
            <div className="main-container">
                <div className="sub-container">
                    <div>
                        <h2 className="hero-text2">Assign Collaborators</h2>
                    </div>
                    <form onSubmit={(e) => this.handleCollaboratorSubmit(
                        e,
                        this.state.user_id,
                        this.state.proj_id
                        )}>
                        {this.renderProjectList()}
                        <div className="dropdown-container">
                            <label className="input-label">Collaborator</label>
                            <select id="user_id"  name="user_id" onChange={this.handleInputChange} >
                                { (this.state.collaboratorDataLoaded) ?
                                    this.state.collaboratorData.map((collaborator,index) => {
                                        return <option key={collaborator.id}
                                        name="user_id"  value={collaborator.id} >{collaborator.username}</option>
                                    })
                                : ""}
                            </select>
                        </div>
                        <div>
                            <input className="" type="submit" value="Submit" />
                        </div>
                  </form>
                  {this.renderCollaboratorList()}
                </div>
            </div>
        )
    }
}

export default Collaborator;
