import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TaskList from './TaskList';
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
        console.log(this.state.project);
        return <div key={this.state.project.id} className="project">
          <h2>*************</h2>
          <h2>*************</h2>
          <h2>*************</h2>
          <h2>*************</h2>
          <h2>*************</h2>
          <h2>*************</h2>
          <h3>{this.state.project.name}</h3>
          <p>{this.state.project.description}</p>
          <p>{this.state.project.category}</p>
          <p>{this.state.project.status}</p>
          <p>{this.state.project.planned_start_datesrt}</p>
          <p>{this.state.project.planned_end_datestr}</p>
          <p>{this.state.project.act_start_date}</p>
          <p>{this.state.project.act_end_date}</p>
          <TaskList proj_id={this.state.project.id} user_id={0}  proj={true} />
          <Link className='editProject' to={`/projectEdit/${this.state.project.id}`}>Edit</Link>
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
