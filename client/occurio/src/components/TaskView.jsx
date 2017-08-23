import React, { Component } from 'react';

const TaskView = (props) => {
  return (
    <div className="task">
      <h3>{props.task.name}</h3>
    </div>
  )
}

export default TaskView;
