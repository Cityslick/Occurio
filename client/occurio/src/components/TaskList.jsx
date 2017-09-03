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
    taskRout=`/task/${this.props.proj_id}`
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
        return <TaskView handlerDeleteTask={this.handlerDeleteTask} userData={this.props.userData} task={task} index={index+1} key={task.id} />
      });
    }
  }

  render() {
    return (

        <div className="task-list">
            <div  className="task-list-header">
                <div  className="task-no" >
                    <h1 className="task-info" >#</h1>
                </div>

                <div  className="task-name" >
                    <h1 className="task-info">Name</h1>
                </div>

                <div  className="task-description" >
                    <h1 className="task-info" >Description</h1>
                </div>

                <div  className="task-date" >
                    <h1 className="task-info">Date</h1>
                </div>

                <div  className="task-date" >
                    <h1 className="task-info">Date</h1>
                </div>

                <div  className="task-detail" >
                    <h1 className="task-info">Ticket</h1>
                </div>

                <div  className="task-detail">
                    <h1 className="task-info">Status</h1>
                </div>

                <div  className="task-detail" >
                    <h1 className="task-info">Collaborator</h1>
                </div>

                <div  className="task-button" >
                </div>

                <div  className="task-button" >
                </div>
            </div>

            {this.renderTaskList()}
        </div>
    );
  };
}

export default TaskList;
