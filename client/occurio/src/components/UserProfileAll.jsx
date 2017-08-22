import React, { Component } from 'react';
import axios from 'axios';

const UserProfileAll = (props) => {

  axios.get('/users', { //refactor to actual route
    username,
    firstname,
    lastname,
    img_url,
  }).then(res => {
    console.log(res); //logging response
    this.setState({
      userData: res.data.user
    })
  })


    return (
        <div className='userList'>
          <select>
            {props.userData.map(users => {
              return <option>{users.img_url}{users.username}{users.name}</option>
            })}
          </select>
        </div>
    )
}

export default UserProfileAll;