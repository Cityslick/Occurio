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
        userData: null,
        userDataLoaded: false,
      }
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit= this.handleSubmit.bind(this);
      this.renderUserProfileEdit = this.renderUserProfileEdit.bind(this);
      this.renderUserType= this.renderUserType.bind(this);
    }

    componentDidMount() {
      if (this.props.userData) {
        axios.get(`/user/id/${this.props.userData.id}`)
          .then(res => {
            this.setState({
              userData: res.data.user,
              username: res.data.user.username,
              firstname: res.data.user.firstname,
              lastname: res.data.user.lastname,
              email: res.data.user.email,
              img_url:res.data.user.img_url,
              proj_link: res.data.user.proj_link,
              user_type: res.data.user.user_type,
              userDataLoaded: true,
            })
          }
        )
      }
    }

    renderUserType(){
      if (this.state.userDataLoaded){
        if (this.state.user_type==="Manager"){
          return(
            <div className="drop-down">
              <div>
                <select  name="user_type" value ={this.state.user_type} onChange={this.handleInputChange}>
                    <option value="Manager"      name="user_type">     Manager</option>
                    <option value="Collaborator" name="user_type">Collaborator</option>
                    <option value="Other"        name="user_type">       Other</option>
                </select>
              </div>
            </div>
          )
        }
      }
    }

    handleSubmit(e, username, firstname, lastname, password, email, img_url, proj_link,user_type) {
        e.preventDefault();
        axios.put(`/user/${this.props.userData.id}`, {
          username,
          firstname,
          lastname,
          email,
          user_type,
          img_url,
          proj_link,
        }).then(res => {
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
                      <label>Username</label>
                      <input className="form" type="text" name="username" value={this.state.username} placeholder="" onChange={this.handleInputChange} required/>
                  </div>

                  <div>
                      <label>First Name</label>
                      <input className="form" type="text" name="firstname" value={this.state.firstname} placeholder="" onChange={this.handleInputChange} required />
                  </div>

                  <div>
                      <label>Last Name</label>
                      <input className="form" type="text" name="lastname" value={this.state.lastname} placeholder="" onChange={this.handleInputChange} required />
                  </div>

                  <div>
                        <label>Email Address</label>
                      <input className="form" type="email" name="email" value={this.state.email} placeholder="" onChange={this.handleInputChange} required />
                  </div>

                  <div>
                        <label>Image URL</label>
                      <input className="form" type="text" name="img_url" value={this.state.img_url} placeholder="" onChange={this.handleInputChange} />
                  </div>

                  <div>
                      <label>Link to Project</label>
                      <input className="form" type="text" name="proj_link" value={this.state.proj_link} placeholder="" onChange={this.handleInputChange} />
                  </div>
                        <label>Username</label>

                  {this.renderUserType}

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
                ? <Redirect push to={`/user/id/${this.props.userData.id}`} />
                : ''}
            </div>
        )
    }
}

export default UserProfileEdit;
