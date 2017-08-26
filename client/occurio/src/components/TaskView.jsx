import React, { Component } from 'react';
import '../App.css';

const TaskView = (props) => {
  return (
    <tr>
      <td>{props.index}</td>
      <td>{props.task.description}</td>
      <td>{props.task.start_datestr}</td>
      <td>{props.task.end_datestr}</td>
      <td>{props.task.ticket}</td>
      <td>{props.task.status}</td>
      <td>{props.task.fullname}</td>
    </tr>
  )
}

export default TaskView;


