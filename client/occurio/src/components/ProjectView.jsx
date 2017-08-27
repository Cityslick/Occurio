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
      projectDataLoaded: false,
      fireRedirect: null,
    }
    this.showTask=this.showTask.bind(this);
  }
  componentDidMount() {
    console.log("Im here ProjectView");
    console.log(this.props.id)

    axios.get(`/project/${this.props.id}`)
    .then(res => {
      this.setState({
        project: res.data.data,
        projectDataLoaded: true,
        fireRedirect: true,
      })
    }).catch(err => console.log(err));
  }
  showTask(){
    if(this.props.presentDetail){
      return <TaskList proj_id={this.state.project.id} user_id={0}  proj={true} />
    }
  }
  renderProject(){
    if (this.state.projectDataLoaded){
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
            <Link className='editProject' to={`/projectEdit/${this.state.project.id}`}>Edit</Link>
            <br/>
            <Link className='editProject'  to={`/projectTask${this.state.project.id}`} >Add Task</Link>
            <br/>
            <Link className='editProject' to={`/projectList`}>All Projects</Link>
            {this.showTask()}
          </div>
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
