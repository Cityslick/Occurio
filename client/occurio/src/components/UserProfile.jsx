import React, { Component } from 'react';
import axios from 'axios';

class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            fullname: '',
        }
    }

    componentDidMount() {
        (this.props.userDataLoaded) ?
            axios.get(`/user/id/${this.props.user.user_id}`)
                .then(res => {
                    console.log(res);
                    this.setState({
                        username: res.data.user.username,
                        fullname: res.data.user.fullname,
                    })
                }
            )
        : ""
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
        </div>
    )
    }
}

export default UserProfile;
