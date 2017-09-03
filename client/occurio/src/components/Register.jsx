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
            user_type: 'Manager',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.clearComponents = this.clearComponents.bind(this);
    }

    clearComponents(){
        this.setState({
            username: '',
            firstname: '',
            lastname: '',
            password: '',
            email: '',
            img_url: '',
            proj_link: '',
            user_type: 'Manager',
        })
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
            <div className="main-container2">
              <div className="sub-container2">
                    <form onSubmit={(e)=>this.props.handleRegisterSubmit(
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

                        <div className="input-container">
                            <label>Username</label>
                            <input className="small-input" type="text" name="username" value={this.state.username} placeholder="" onChange={this.handleInputChange} required/>
                        </div>

                        <div className="input-container">
                            <label>First Name</label>
                            <input className="normal-input" type="text" name="firstname" value={this.state.firstname} placeholder="" onChange={this.handleInputChange} required />
                        </div>

                        <div className="input-container">
                            <label>Last Name</label>
                            <input className="normal-input" type="text" name="lastname" value={this.state.lastname} placeholder="" onChange={this.handleInputChange} required/>
                        </div>

                        <div className="input-container">
                            <label>Password    </label>
                            <input className="small-input" type="password" name="password" value={this.state.password} placeholder="" onChange={this.handleInputChange} required/>
                        </div>

                        <div className="input-container" id="email">
                            <label>Email</label>
                            <input  className="normal-input" type="email" name="email" value={this.state.email} placeholder="" onChange={this.handleInputChange} required/>
                        </div>

                        <div className="input-container">
                            <label>Img URL</label>
                            <input className="normal-input" type="text" name="img_url" value={this.state.img_url} placeholder="" onChange={this.handleInputChange} required/>
                        </div>

                        <div className="input-container">
                            <label>Github </label>
                            <input className="normal-input" type="text" name="proj_link" value={this.state.proj_link} placeholder="" onChange={this.handleInputChange} required />
                        </div>

                        <div className="dropdown-container">
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
