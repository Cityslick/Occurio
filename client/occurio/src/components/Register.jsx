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
        this.handleRegisterSubmit= this.handleRegisterSubmit.bind(this);
    }

    handleRegisterSubmit(e, username, firstname, lastname, password, email, img_url, proj_link,user_type) {
        console.log(username);
        e.preventDefault();
        axios.post('/auth', {
            username,
            firstname,
            lastname,
            password,
            email,
            user_type,
        }).then(res => {
            this.setState({
                auth: res.data.auth,
                user: res.data.user,
                fireRedirect: true,
                currentPage: 'home',
                userDataLoaded:true,
            });

        }).catch(err => console.log(err));
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        })
        console.log(value);
    }

    render(){
        return(
            <div className="register">
              <div className="form">
                <div>
                  <h2 className="hero-text2">Create an Okurio Account!</h2>
                </div>

                  <form onSubmit={(e) => this.handleRegisterSubmit(
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
                        <input className="form" type="text" name="password" value={this.state.password} placeholder="Password" onChange={this.handleInputChange} />
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

                    <div>
                        <div className="select">
                            <select type="user" name="user_type" onChange={this.handleInputChange}>
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

export default Register;
