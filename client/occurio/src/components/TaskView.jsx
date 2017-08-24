import React, { Component } from 'react';

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
      <td><input type="submit" value="Edit"/></td>
      <td><input type="submit" value="Delete" onClick={()=>{props.handlerDeleteTask(props.task.id)}} /></td>
    </tr>
  )
}

export default TaskView;


