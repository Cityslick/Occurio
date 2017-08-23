import React, { Component } from 'react';
import TaskView from './TaskView';

class TaskList extends Component {
  constructor() {
    super();
    // state
    this.state = {
      taskData: null,
      taskDataLoaded: false,
    }
  }

  renderTaskList() {
    axios()
    .then(res=>{
      this.setState({
        taskData: res.data,
        taskDataLoaded: true,
      })
    }).catch(err=>{

    })

  }

  renderQuoteList() {
    if (this.state.taskDataLoaded) {
      return this.state.taskData.map((task) => {
        return <TaskView task={task} key={task.id} />
      });
    } else return <h1> Loading </h1>
  }

  render() {
    return (
      <div className="">
        {this.renderTaskList()}
      </div>
    );
  };
}

export default TaskList;
