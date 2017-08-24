import React, { Component } from 'react';
import axios from 'axios';

import CollaboratorView from './CollaboratorView';
import ProjectView from './ProjectView';

class CollaboratorList extends Component {
  constructor() {
    super();
    // state
    this.state = {
      collaboratorData: null,
      collaboratorDataLoaded: false,
    },
    this.renderCollaboratorList =this.renderCollaboratorList.bind(this);
    this.handlerDeleteCollaborator = this.handlerDeleteCollaborator.bind(this);
    this.handlerReloadList = this.handlerReloadList.bind(this);
  }

  componentDidMount() {
    this.handlerReloadList();
  }

  handlerReloadList() {
    let filter="";
    let proj_id=this.props.proj_id
    axios.get(`/collaborator/${this.props.proj_id}`,{
       proj_id,
       filter,
    })
    .then(res=>{
      this.setState({
        collaboratorData: res.data.data,
        collaboratorDataLoaded: true,
      })
    }).catch(err=>{
      console.log(err.json);
    })
  }


  handlerDeleteCollaborator(proj_id,user_id){
    console.log(proj_id,user_id);
    axios.post(`collaborator/${proj_id}`,{
      proj_id,
      user_id,
    })
    .then(()=>{
      this.handlerReloadList();
    }).catch(err=>{
      console.log(err);
    })
  }

  renderCollaboratorList() {
    if (this.state.collaboratorDataLoaded) {
      return this.state.collaboratorData.map((collaborator,index) => {
        return <CollaboratorView handlerDeleteCollaborator={this.handlerDeleteCollaborator} collaborator={collaborator} index={index+1} key={index+1} />
      });
    }
  }

  render() {
    return (
      <div className="List">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Collaborator</th>
            </tr>
          </thead>
          <tbody>
            {this.renderCollaboratorList()}
          </tbody>
        </table>

      </div>
    );
  };
}

export default CollaboratorList;
