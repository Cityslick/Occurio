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
      task_id:0,
    },
    this.renderTaskList =this.renderTaskList.bind(this);
    this.handlerDeleteTask = this.handlerDeleteTask.bind(this);
  }

  componentDidMount() {
    this.handlerReloadList();
    this.setState({
      task_id:this.props.task_id,
    })
  }

  handlerReloadList() {
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

  handlerDeleteTask(task_Id){
    axios.delete(`task/${task_Id}`)
    .then(()=>{
      this.handlerReloadList();
    })
    .catch(err=>{
      console.log(err);
    })
  }

  renderTaskList() {
    if (this.state.taskDataLoaded) {
      return this.state.taskData.map((task,index) => {
        return <TaskView handlerDeleteTask={this.handlerDeleteTask} task={task} index={index+1} key={task.id} />
      });
    }
  }

  render() {
    return (
      <div className="List">
        <h1>{this.props.task_id}</h1>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Ticket</th>
              <th>Status</th>
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
