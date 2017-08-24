import React, { Component } from 'react';
import axios from 'axios';
import TaskView from './TaskView';
import ProjectView from './ProjectView';

class TaskList extends Component {
  constructor() {
    super();
    // state
    this.state = {
      taskData: null,
      taskDataLoaded: false,
    },
    this.renderTaskList =this.renderTaskList.bind(this);
  }

  componentDidMount() {
    //same view to render users or projects task
    var taskRout;
    let proj_id=this.props.proj_id;
    let user_id=this.props.user_id;
    let filter="";
    (this.props.proj)?  taskRout=`/task/${this.props.proj_id}` : taskRout=(`/task/user/${this.props.user_id}`)
    axios.post(taskRout,{
       proj_id,
       user_id,
       filter,
    })
    .then(res=>{
      this.setState({
        taskData: res.data.data,
        taskDataLoaded: true,
      })
    }).catch(err=>{
      console.log(err.json);
    })
  }

  renderTaskList() {
    if (this.state.taskDataLoaded) {
      return this.state.taskData.map((task,index) => {
        return <TaskView task={task} index={index+1} key={task.id} />
      });
    } else return <h1> Loading </h1>
  }

  render() {
    return (
      <div className="List">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Ticket</th>
              <th>Collaborator</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTaskList()}
          </tbody>
        </table>

      </div>
    );
  };
}

export default TaskList;
