import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TaskList from './TaskList';
import '../App.css';


class ProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null,
      user:null,
      projectDataLoaded: false,
      fireRedirect: null,
    }
    this.showTask=this.showTask.bind(this);
  }
  componentDidMount() {
    console.log("Im here ProjectView");
    console.log(this.props)
    axios.get(`/project/${this.props.id}`)
    .then(res => {
      this.setState({
        user : this.props.userData,
        project: res.data.data,
        projectDataLoaded: true,
        fireRedirect: true,
      })
    }).catch(err => console.log(err));
  }
  showTask(){
    console.log(this.props.userData);
    if(this.props.presentDetail){
      return <TaskList proj_id={this.state.project.id}  user_id={this.props.userData.id}  proj={true} />
    }
  }
  renderProject(){
    if (this.state.projectDataLoaded){
        console.log(this.props, "-")
        return <div key={this.state.project.id} className="project">
          <div className="projectView">
            <h3>{this.state.project.name}</h3>
            <h2>Description:</h2>
            <p>{this.state.project.description}</p>
            <h2>Category:</h2>
            <p>{this.state.project.category}</p>
            <h2>Status:</h2>
            <p>{this.state.project.status}</p>
            <p>{this.state.project.planned_start_datesrt}</p>
            <p>{this.state.project.planned_end_datestr}</p>
            <p>{this.state.project.act_start_date}</p>
            <p>{this.state.project.act_end_date}</p>
            <div className="project-view-links">
              {(this.props.userData.user_type==="Manager") ?
              <Link className='editProject' to={`/projectEdit/${this.state.project.id}`}>Edit</Link>
              : <Link to="#"></Link>}
              <br/>
              {(this.props.userData.user_type==="Manager") ?
              <Link className='editProject'  to={`/projectTask/${this.state.project.id}`} >Add Task</Link>
              : <Link to="#"></Link>}
              <br/>
              <Link className='editProject' to={`/projectList`}>All Projects</Link>
            </div>
            <br/>
          </div>
            {this.showTask()}
        </div>
      }
    }
  render() {
    return (
      <div className="viewProject">
        {this.renderProject()}
      </div>
    )
  }
}
export default ProjectView;
