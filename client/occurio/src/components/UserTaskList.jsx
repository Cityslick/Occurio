import React, { Component } from 'react';
import axios from 'axios';
import {
  Link
} from 'react-router-dom';

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
    this.handlerDeleteTask = this.handlerDeleteTask.bind(this);
  }

  componentDidMount() {
    this.handlerReloadList();
  }

  handlerReloadList() {
    //same view to render users or projects task
    console.log(this.props);
    var taskRout;
    let proj_id=this.props.proj_id;
    let user_id=this.props.user_id;
    let filter="";
    taskRout=(`/task/user/${this.props.user_id}`)
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
        return <TaskView handlerDeleteTask={this.handlerDeleteTask} task={task}  user_id={this.props.user_id} index={index+1} key={task.id} />
      });
    }
  }

  render() {
    return (
      <div className="user-task-list">
        <div className="List">
            <div className="tasklist-view">
              <div className="tasktitle">
                <h4>#</h4>
              </div>
              <div className="tasktitle">
                <h4>Description</h4>
              </div>
              <div className="tasktitle">
                <h4>Start Date</h4>
              </div>
              <div className="tasktitle">
                <h4>End Date</h4>
              </div>
              <div className="tasktitle">
                <h4>Ticket</h4>
              </div>
              <div className="tasktitle">
                <h4>Status</h4>
              </div>
              <div className="tasktitle">
                <h4>Collaborator</h4>
              </div>
            </div>

          <div className="task-body">
            {this.renderTaskList()}
          </div>


        </div>
      </div>
    );
  };
}

export default TaskList;
