import React, { Component } from 'react';

const Project = (props) => {
  return (
    <div className="project">
      <h3>{props.project.name}</h3>
      <p>{props.project.description}</p>
      <p>{props.project.category}</p>
      <p>{props.project.status}</p>
      <p>{props.project.planned_start_date}</p>
      <p>{props.project.planned_end_date}</p>
      <p>{props.project.act_start_date}</p>
      <p>{props.project.act_end_date}</p>
    </div>
  )
}

export default Project;
