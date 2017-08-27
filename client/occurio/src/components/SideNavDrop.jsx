import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

// THIS COMPONENT USES THE CUSTOM NPM PACKAGE 

class SideNavDrop extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          isOpen: false
      };
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
      this.setState({
          isOpen: !this.state.isOpen
      });
    }

    render() {
        const componentClassName = classNames('side-nav-drop', {"is-open": this.state.isOpen});

        return (
            <div className={componentClassName}>
                <button onClick={this.handleClick}></button>
                <nav>
                <button onClick={this.handleClick}></button>
                  <div className="sidenav">
                    <Link to="/home">Home</Link>  
                    <Link to="/contact">About</Link>
                    <Link to="/contact">Contact</Link>  
                    <Link to="/contact">Register</Link>    
                  </div>
                </nav>
            </div>
        );
    }
  }

  export default SideNavDrop;