import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';
import '../Projects.css';

class ViewUserProjects  extends Component {
  constructor() {
    super();
    this.state = {
      projects: null,
      projectDataLoaded: false,
    },
    this.renderProjectsList = this.renderProjectsList.bind(this);
  }

  componentDidMount() {
    let route=`/project/user/${this.props.user.id}`
    if (this.props.user.user_type!=="Manager"){
      route=`/project/col/${this.props.user.id}`
    }
    axios.get(route)
    .then(res => {
      this.setState({
        projects: res.data.data,
        projectDataLoaded: true,
      })
    }).catch(err => console.log(err));
  }

  renderProjectsList(){
    if (this.state.projectDataLoaded){
        return this.state.projects.map((project,index) => {
          return <div key={index} className="projects">
                    <div className="project-info">
                      <div className="project-name">
                        <h2>{project.name}</h2>
                      </div>
                      <div className="project-links">
                        <div className="single-project">
                          <Link className='viewProject'  to={`/projectList/${project.id}`} >More Info</Link>
                        </div>

                      {(this.props.user.user_type=="Manager") ? <div className="add-task"><Link className='viewProject'  to={`/projectTask/${project.id}`} >Add Task</Link> </div>: ""}

                        {(this.props.user.user_type=="Manager") ? <div className="add-task">
                          <Link className='viewProject'  to={`/projectCol/${project.id}`} >Add Collaborator</Link>
                        </div>: ""}
                      </div>
                    </div>
                </div>
        })}
    }


  render() {
    return (
      <div className="project-list">
        {this.renderProjectsList()}
      </div>
    )
  }
}

export default ViewUserProjects;
