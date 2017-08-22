import React, { Component } from 'react';

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
    }

    render(){
        return(
            <div>
              <div className="form">
                <h1>
                  <h2 className="hero-text2">Create an Occurio Account!</h2>
                </h1>

                  <form onSubmit={(e) => this.props.handleLoginSubmit(
                    e, 
                    this.state.id,
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
                    <input className="form" type="text" name="username" value="" placeholder="Username" onChange="" />
                    </div>
                    <div>
                    <input className="form" type="text" name="firstname" value="" placeholder="First Name" onChange="" />
                    </div>
                    <div>
                    <input className="form" type="text" name="lastname" value="" placeholder="Last Name" onChange="" />
                    </div>
                    <div>
                    <input className="form" type="text" name="password" value="" placeholder="Password" onChange="" />
                    </div>
                    <div>
                    <input className="form" type="text" name="email" value="" placeholder="Email Address" onChange="" />
                    </div>
                    <div>
                    <input className="form" type="text" name="img_url" value="" placeholder="Image URL" onChange="" />
                    </div>
                    <div>
                    <input className="form" type="text" name="proj_link" value="" placeholder="Link to Project" onChange="" />
                    </div>
                    <div>
                    <input className="form" type="text" name="user_type" value="" placeholder="User Type" onChange="" />
                    </div>
                    <div>
                    <input className="form" type="submit" value="Enter" />
                    </div>
                    <div>
                    <h1>Okurio is the easiest way to manage.</h1>
                    </div>
                  </form>
              </div>
            </div>
        )
    }
}

export default Register;

