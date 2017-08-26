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
      fireRedirect:null,
    },
    this.renderProjectsList = this.renderProjectsList.bind(this);
  }

  componentDidMount() {
    //console.log("asdokdoasko", this.props.user_id,this.props.for_user,"id");
    let route="";
    axios.get(`/project/user/${this.props.user.id}`)
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
                    <div className="project-info">
                      <div className="project-name">
                        <h2>{project.name}</h2>
                      </div>
                      <div className="project-links">
                        <div className="single-project">
                          <Link className='viewProject'  to={`/projectList/${project.id}`} >More Info</Link>
                        </div>
                        <div className="add-task">
                          <Link className='viewProject'  to={`/projectTask/${project.id}`} >Add Task</Link>
                        </div>
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
