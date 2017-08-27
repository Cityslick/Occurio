import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
    constructor() {
        super();
        // assume we need this
        this.state = {
            username: '',
            firstname: '',
            lastname: '',
            password: '',
            email: '',
            img_url: '',
            proj_link: '',
            user_type: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        })
    }

    render(){
        return(
            <div className="register">
              <div className="form">
                  <form onSubmit={(e) => this.props.handleRegisterSubmit(
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
                        <h2 className="hero-text2">Create an Okurio Account!</h2>
                    </div>

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
                        <input className="form" type="text" name="lastname" value={this.state.lastname} placeholder="" onChange={this.handleInputChange} required/>
                    </div>

                    <div>
                        <label>Password</label>
                        <input className="form" type="password" name="password" value={this.state.password} placeholder="" onChange={this.handleInputChange} required/>
                    </div>

                    <div>
                        <label>Email Address</label>
                        <input className="form"  type="email" name="email" value={this.state.email} placeholder="" onChange={this.handleInputChange} required/>
                    </div>

                    <div>
                        <label>Image URL</label>
                        <input className="form" type="text" name="img_url" value={this.state.img_url} placeholder="" onChange={this.handleInputChange} required/>
                    </div>

                    <div>
                        <label>Link to Project</label>
                        <input className="form" type="text" name="proj_link" value={this.state.proj_link} placeholder="" onChange={this.handleInputChange} required />
                    </div>

                    <div className="x">
                        <label>User type</label>
                        <div className="select">
                            <select type="user" name="user_type" onChange={this.handleInputChange}>
                                <option value="Manager"      name="user_type">     Manager</option>
                                <option value="Collaborator" name="user_type">Collaborator</option>
                                <option value="Other"        name="user_type">       Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="x">
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

export default Register;
