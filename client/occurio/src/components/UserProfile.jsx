import React, { Component } from 'react';
import axios from 'axios';
import {
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
        console.log('Loading Component');
        console.log(this.props.loggedIn);
        console.log(this.props.user);
        if (this.props.loggedIn) {
            axios.get(`/user/id/${this.props.user.id}`)
                .then(res => {
                    console.log(res.data);
                    this.setState({
                        username: res.data.user.username,
                        fullname: res.data.user.fullname,
                    })
                }
            )
        }
    }

    render() {
    return (
        <div>
          <div>
              <h1>User Profile</h1>
              <h2>{this.state.username}</h2>
          </div>
          <div>
              <h3>Welcome back, {this.state.fullname}!</h3>
          </div>
          <Link to={'/project'}>Create A Project</Link>
          <Link to={'/user-projects'}>View Your Projects</Link>
        </div>
    )
    }
}

export default UserProfile;