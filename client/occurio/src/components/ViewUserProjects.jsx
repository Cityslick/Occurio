import React from 'react';

import ProjectView from './ProjectView';

const ProjectsList = (props) => {
  return (
    <div className="project-list">
      {props.projects.map(project => {
        return <div className="projects">
        <h2>{project.name}</h2>
        <h3 onClick={this.viewProject}>View Project</h3>
        </div>
      })}
    </div>
  )
}

export default ProjectsList;
