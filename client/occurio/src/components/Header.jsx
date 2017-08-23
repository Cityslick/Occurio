import React from 'react';
// LOGIN/REGISTER
import Login from './Login';
import Register from './Register';

import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <div className="header">
          <Link to={'/home'}>Home</Link>
          <Link to={'/login'}>Log In</Link>
          <Link to={'/register'}>Register</Link>
        </div>
    )
}

export default Header;
