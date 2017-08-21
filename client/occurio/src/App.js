import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// BODY
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <p>Occurio is a simple project management tool designed to improve collaboration in small teams.</p>
        </p>
        <Footer />
      </div>
    );
  }
}

export default App;
