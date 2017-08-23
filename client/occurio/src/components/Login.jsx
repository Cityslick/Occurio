import React, { Component } from 'react';

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
        return(
            <div>
            <h1>
                <h2 className="hero-text2">Welcome to Okurio</h2>
            </h1>
            <div className="login-container">
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
            </div>
        )
    }
}

export default Login;
