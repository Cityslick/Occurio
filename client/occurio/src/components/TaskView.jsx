import React, { Component } from 'react';
import '../App.css';
import {
  Link
} from 'react-router-dom';

const TaskView = (props) => {
  console.log(props.user_id,props.task.user_id);
  return (
    <div className="tasks-table">
      <div className="table-data-num sub">{props.index}</div>
      <div className="table-data-desc">{props.task.description}</div>
      <div className="table-data-date">{props.task.start_datestr}</div>
      <div className="table-data-date">{props.task.end_datestr}</div>
      <div className="table-data">{props.task.ticket}</div>
      <div className="table-data-status">{props.task.status}</div>
      <div className="table-data-name">{props.task.fullname}</div>

      <div className="table-data-name">
        {(props.user_id==props.task.user_id) ?
        <Link to={`/TaskEdit/${props.task.id}`}><input type="submit" value="Edit"/></Link>
        :""}
      </div>

    </div>
  )
}

export default TaskView;


