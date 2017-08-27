import React, { Component } from 'react';
import '../App.css';

const TaskView = (props) => {
  return (
    <div className="tasks-table">
      <div className="table-data-num">{props.index}</div>
      <div className="table-data-desc">{props.task.description}</div>
      <div className="table-data-date">{props.task.start_datestr}</div>
      <div className="table-data-date">{props.task.end_datestr}</div>
      <div className="table-data">{props.task.ticket}</div>
      <div className="table-data-status">{props.task.status}</div>
      <div className="table-data-name">{props.task.fullname}</div>
    </div>
  )
}

export default TaskView;


