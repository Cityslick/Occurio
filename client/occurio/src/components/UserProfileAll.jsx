import React, { Component } from 'react';
import axios from 'axios';

class UserProfileAll extends Component {
  constructor() {
    super();
    this.state= {
      userData: '',
      apiDataloaded: false,
    }
  }

  componentDidMount() {
    axios.get('/user')
    .then(res => {
      this.setState({
        userData: res.data.users,
        apiDataloaded: true,
      })
    })
  }

  render() {
    return (
        <div className='userList'>
          <select>
            { (this.state.apiDataloaded) ? 
              this.state.userData.map(user => {
                return <option key={user.id}>{user.firstname} {user.lastname}</option>
              })
             : ""}
          </select>
        </div>
    )
  }
}

export default UserProfileAll;