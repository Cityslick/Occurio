import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }

    handleLoginSubmit(e, username, password) {
        console.log("logging in...");
        e.preventDefault();
        axios.post('/auth/login', {
            username,
            password,
        }).then(res => {
          this.setState({
              auth: res.data.auth,
              user: res.data.user,
              fireRedirect: true,
              loggedIn: true,
          });
        }).catch(err => console.log(err));
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        })
    }

    render(){
      const { fireRedirect } = this.state;

        return(
            <div className="sign-in">
            <div>
                <h2 className="welcome-txt">Welcome to Okurio</h2>
            </div>
            <div className="form">
                <form onSubmit={(e) => this.handleLoginSubmit(
                    e,
                    this.state.username,
                    this.state.password
                    )}>

                    <div>
                    <input className="form" type="text" name="username" value={this.state.username} placeholder="Username" onChange={this.handleInputChange} />
                    </div>
                    <div>
                    <input className="form" type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleInputChange} />
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

export default Login;
