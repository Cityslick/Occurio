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
        return <TaskList proj_id={this.state.project.id}  user_id={this.props.userData.id}  proj={true} />
    }

    renderProject(){
        if (this.state.projectDataLoaded){
            return <div key={this.state.project.id} className="project">
                <div className="projectView">
                    <h3 className="main-project-info">
                        {this.state.project.name}
                    </h3>

                    <h1 className="project-info-h">
                        Description
                    </h1>

                    <p className="project-info-d">
                       {this.state.project.description}
                    </p>

                    <h1 className="project-info-h">
                        Category
                    </h1>

                    <p className="project-info-d">
                        {this.state.project.category}
                    </p>

                    <h1 className="project-info-h">
                        Status:
                    </h1>

                    <p className="project-info-d">
                        {this.state.project.status}
                    </p>

                    <h1  className="project-info-h">
                      Planned start Date
                    </h1>

                    <p  className="project-info-d">
                        {this.state.project.planned_start_datesrt}
                    </p>

                    <h1 className="project-info-h">
                        Planned end Date
                    </h1>

                    <p  className="project-info-d">
                        {this.state.project.planned_end_datestr}
                    </p>

                    <h1 className="project-info-h">
                        Started Date
                    </h1>

                    <p className="project-info-d">
                        {this.state.project.act_start_date}
                    </p>

                    <h1 className="project-info-h">
                        Ended Date
                    </h1>

                    <p  className="project-info-d">
                        {this.state.project.act_end_date}
                    </p>

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
            <div className="main-container">
                <div className="task-container">
                    {this.renderProject()}
                </div>
            </div>

        )
    }
}
export default ProjectView;
