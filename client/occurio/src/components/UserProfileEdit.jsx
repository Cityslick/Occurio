import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class UserProfileEdit extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            firstname: '',
            lastname: '',
            password: '',
            email: '',
            img_url: '',
            proj_link: '',
            user_type: '',
            userdataLodaed: false,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get(`user/id/:${this.props.user.id}`)
          .then((res) => {
            this.setState({
              username: res.data.data.username,
              firstname: res.data.data.firstname,
              lastname: res.data.data.lastname,
              password: res.data.data.password,
              email: res.data.data.email,
              img_url: res.data.data.img_url,
              proj_link: res.data.data.proj_link,
              user_type: res.data.data.user_type,
              userdataLodaed: true,
            })
          }).catch(err => console.log(err));
      }

    handleSubmit(e, username, firstname, lastname, password, email, img_url, proj_link,user_type) {
        console.log(username);
        e.preventDefault();
        axios.put(`/user/${this.props.id}`, {
          username,
          firstname,
          lastname,
          password,
          email,
          user_type,
        }).then(res => {
            console.log(res);
            this.setState({
              auth: res.data.auth,
              user: res.data.user,
              fireRedirect: true,
              userDataLoaded:true,
            });

        }).catch(err => {
          console.log(err);
        })
      }


    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        })
        console.log(value);
    }

    renderUserProfileEdit() {
      if (this.state.userDataloaded) {
        return (
          <div>
          <h1>Edit Profile</h1>
            <div className="form">
                <form onSubmit={(e) => this.handleSubmit(
                  e,
                  this.state.username,
                  this.state.firstname,
                  this.state.lastname,
                  this.state.password,
                  this.state.email,
                  this.state.img_url,
                  this.state.proj_link,
                  this.state.user_type
                  )}>
                  <div>
                      <input className="form" type="text" name="username" value={this.state.username} placeholder="Username" onChange={this.handleInputChange} />
                  </div>

                  <div>
                      <input className="form" type="text" name="firstname" value={this.state.firstname} placeholder="First Name" onChange={this.handleInputChange} />
                  </div>

                  <div>
                      <input className="form" type="text" name="lastname" value={this.state.lastname} placeholder="Last Name" onChange={this.handleInputChange} />
                  </div>

                  <div>
                      <input className="form" type="Password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleInputChange} />
                  </div>

                  <div>
                      <input className="form" type="text" name="email" value={this.state.email} placeholder="Email Address" onChange={this.handleInputChange} />
                  </div>

                  <div>
                      <input className="form" type="text" name="img_url" value={this.state.img_url} placeholder="Image URL" onChange={this.handleInputChange} />
                  </div>

                  <div>
                      <input className="form" type="text" name="proj_link" value={this.state.proj_link} placeholder="Link to Project" onChange={this.handleInputChange} />
                  </div>

                  <div className="drop-down">
                      <div>
                          <select  name="user_type" onChange={this.handleInputChange}>
                              <option value="Manager"      name="user_type">     Manager</option>
                              <option value="Collaborator" name="user_type">Collaborator</option>
                              <option value="Other"        name="user_type">       Other</option>
                          </select>
                      </div>
                  </div>

                  <div>
                      <input className="form" type="submit" value="Enter" />
                  </div>

                  <div>
                      <h3 className="register-done">Already have an account?</h3>
                  </div>
                </form>
            </div>
          </div>
        )
      }
    }

    render(){
        return(
            <div className="register">
              {this.renderUserProfileEdit()}
              {this.state.fireRedirect
                ? <Redirect push to={`/user/${this.props.id}`} />
                : ''}
            </div>
        )
    }
}

export default UserProfileEdit;
