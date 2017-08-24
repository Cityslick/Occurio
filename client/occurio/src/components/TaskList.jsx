import React, { Component } from 'react';
import axios from 'axios';
import TaskView from './TaskView';

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
    axios.post(`/task/${this.props.proj_id}`)
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
