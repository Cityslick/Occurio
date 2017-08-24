import React from 'react';
// LOGIN/REGISTER
import Login from './Login';
import Register from './Register';

import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <div className="header">
            <div>
              <h1 className="logo"><Link to={'/home'}>okurio</Link></h1>
            </div>
          <Link to={'/home'}>Home</Link>
          <Link to={'/login'}>Log In</Link>
          <Link to={'/register'}>Register</Link>
          <Link to={'/task'}>_______Task______</Link>
          <Link to={'/collaborators'}> ______Collaborators______</Link>

        </div>
    )
}

export default Header;
