import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            fullname: '',
        }
    }

    componentDidMount() {
        axios.get(`/user/id/${this.props.user.user_id}`)
            .then(res => {
                console.log(res);
                this.setState({
                    username: res.data.user.username,
                    fullname: res.data.user.fullname,
                })
            })
    }

    render() {
    return (
        <div>
          <div>
              <h1>User Profile</h1>
              <h2>{this.state.username}</h2>
          </div>
          <div>
              <h6>{this.state.fullname}</h6>
          </div>
          <Link to={'/project'}>Create A Project</Link>
          <Link to={'/user-projects'}>View Your Projects</Link>
        </div>
    )
    }
}

export default UserProfile;
