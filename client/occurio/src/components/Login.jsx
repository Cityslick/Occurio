import React, { Component } from 'react';

class Login extends Component {
    constructor() {
        super();
        // assume we need this
        this.state = {
            username: '',
            password: '',
        }
    }

    render(){
        return(
            <div>
            <h1>
                <h2 className="welcome-txt">Welcome to Occurio</h2>
            </h1>
            <div className="form">
                <form onSubmit={(e) => this.props.handleLoginSubmit(
                    e, 
                    this.state.username, 
                    this.state.password
                    )}>

                    <div>
                    <input className="form" type="text" name="username" value="" placeholder="Username" onChange="" />
                    </div>
                    <div>
                    <input className="form" type="text" name="password" value="" placeholder="Password" onChange="" />
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

