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
            <div className="login-page">
            <div>
                <h2 className="welcome-text">Welcome to Okurio!</h2>
            </div>
            <div className="form">
                <form onSubmit={(e) => this.props.handleLoginSubmit(
                    e,
                    this.state.username,
                    this.state.password
                    )}>
                    <div>
                    <input className="form" type="text" name="username" value={this.state.username} placeholder="Username" onChange={this.handleInputChange} />
                    </div>
                    <div>
                    <input className="form" type="text" name="password" value={this.state.password} placeholder="Password" onChange={this.handleInputChange} />
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