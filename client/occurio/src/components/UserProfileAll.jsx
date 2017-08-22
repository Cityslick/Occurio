import React, { Component } from 'react';
import axios from 'axios';

class UserProfileAll extends Component {
  constructor() {
    super();
    this.getAllUsers = this.getAllUsers.bind(this);
  }

  getAllUsers() {
    axios.get('/user').then(res => {
      console.log(res); //logging response
      this.setState({
        userData: res.data.user
      })
    })
  }

  render() {
    return (
        <div className='userList'>
          <select>
            {this.getAllUsers};
          </select>
        </div>
    )
  }
}

export default UserProfileAll;