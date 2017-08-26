import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

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
                    <Link to="/">Home</Link>  
                    <Link to="/contact">Contact</Link>  
                </nav>
            </div>
        );
    }
  }

  export default SideNavDrop;