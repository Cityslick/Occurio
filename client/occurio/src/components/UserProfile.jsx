import React, { Component } from 'react';
import axios from 'axios';

class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            firstname: '',
            lastname: '',
        }
    }

    componentDidMount() {
        axios.get('/user/id/:id')
            .then(res => {
                console.log(res);
            })
    }

    render() {
    return (
        <div>
        <div>
            <h1>User Profile</h1>
        </div>
        <div>
            <h6>Name</h6>
            <h6>Role</h6>
            <h6>Description</h6>
        </div>
        </div>
    )
    }
}

export default UserProfile;