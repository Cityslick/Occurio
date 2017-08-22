import React, { Component } from 'react';
import axios from 'axios';

class UserProfile extends Component {
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