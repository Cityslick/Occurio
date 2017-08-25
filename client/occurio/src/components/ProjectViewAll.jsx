import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ViewUserProjects  extends Component {
  constructor() {
    super();
    this.state = {
      projects: null,
      projectDataLoaded: false,
      fireRedirect:null,
    },
    this.renderProjectsList = this.renderProjectsList.bind(this);
  }

  componentDidMount() {
    axios.get('/project')
    .then(res => {
      this.setState({
        projects: res.data.data,
        projectDataLoaded: true,
        fireRedirect: true,
      })
    }).catch(err => console.log(err));
  }

  renderProjectsList(){

    if (this.state.projectDataLoaded){
        return this.state.projects.map((project) => {
          return <div className="projects">
                  <h2>{project.name}</h2>
                  <Link className='viewProject'  to={`/projectList/${project.id}`} >View Project information</Link>
                  <Link className='viewProject'  to={`/projectList/task/${project.id}`} >Add Task</Link>
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
