import React, { Component } from 'react';
import '../App.css';
import {
  Link
} from 'react-router-dom';

const TaskView = (props) => {
    return (
        <div  className="task-list-detail"  key={props.index}>
            <div className="task-no">
                <h1 className="task-info" >{props.index}</h1>
            </div>

            <div className="task-name">
                <h1 className="task-info" >{props.task.name}</h1>
            </div>

            <div className="task-description">
                <h1 className="task-info" >{props.task.description}</h1>
            </div>

            <div className="task-date">
                <h1 className="task-info" >{props.task.start_datestr}</h1>
            </div>

            <div className="task-date">
                <h1 className="task-info" >{props.task.end_datestr}</h1>
            </div>

            <div className="task-detail">
                <h1 className="task-info" >{props.task.ticket}</h1>
            </div>

            <div className="task-detail">
                <h1 className="task-info" >{props.task.status}</h1>
            </div>

            <div className="task-detail">
                <h1 className="task-info" >{props.task.fullname}</h1>
            </div>

            <div className="task-button">
                {(props.user_id==props.task.user_id) ?
                <Link to={`/TaskEdit/${props.task.id}`}>
                    <span className="button-span small-button">Edit</span>
                </Link>
                :""}
            </div>

        </div>
    )
}

export default TaskView;


