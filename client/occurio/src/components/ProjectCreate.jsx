import React from 'react';

const ProjectCreate = () => {
    return (
        <div className="">
          <div className="project">
          <form>
            <input className="form" type="text" name="username" placeholder="Project Name" onChange={this.handleInputChange} />
            <input className="form" type="password" name="password" placeholder="Description" onChange={this.handleInputChange} />
            <input className="form" type="submit" value='Enter' />
          </form>
          </div>
        </div>
    )
}

export default ProjectCreate;