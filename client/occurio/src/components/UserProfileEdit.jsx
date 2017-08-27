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
            userDataLoaded: false,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.renderUserProfileEdit = this.renderUserProfileEdit.bind(this);
    }

    componentDidMount() {
            this.setState({
              username: this.props.userData.username,
              firstname: this.props.userData.firstname,
              lastname: this.props.userData.lastname,
              email: this.props.userData.email,
              img_url: this.props.userData.img_url,
              proj_link: this.props.userData.proj_link,
              user_type: this.props.userData.user_type,
              userDataLoaded: true,
            })
        //   }).catch(err => console.log(err));
      }

    handleSubmit(e, username, firstname, lastname, password, email, img_url, proj_link,user_type) {
        console.log(username);
        e.preventDefault();
        axios.put(`/user/${this.props.userData.id}`, {
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
      if (this.state.userDataLoaded) {
        return (
          <div>
          <h1 className='hero-text2'>Edit Profile</h1>
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
