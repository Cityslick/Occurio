import React, { Component } from 'react';
import { Redirect } from 'react-router';

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
            <div>
            <div>
                <h2 className="welcome-txt">Welcome to Occurio</h2>
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
