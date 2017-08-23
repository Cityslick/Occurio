import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// AXIOS
import axios from 'axios';

// HEADER/FOOTER/HOME
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx';

// LOGIN/REGISTER
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';

// PROJECTS
import ProjectCreate from './components/ProjectCreate.jsx';
import ProjectView from './components/ProjectView.jsx';
import ViewUserProjects from './components/ViewUserProjects.jsx';

// TASKS
import Task from './components/Login.jsx';

// USERS
import UserProfile from './components/UserProfile.jsx';
import UserProfileAll from './components/UserProfileAll.jsx';



class App extends Component {
  constructor() {
    super();
    this.state = {
        auth: false,
        user: null,
        currentPage: 'home',
    }
    // AUTH
    this.setPage = this.setPage.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit= this.handleRegisterSubmit.bind(this);
    this.logOut =  this.logOut.bind(this);

    // Create Project
    this.handleCreateProject = this.handleCreateProject.bind(this);
    // View Project
    this.viewProject = this.viewProject.bind(this);

  }

    setPage(page) {
        this.setState({
            currentPage: page,
        })
    }

   handleLoginSubmit(e, username, password) {
        e.preventDefault();
        axios.post('/auth/login', {
            username,
            password,
        }).then(res => {
            console.log(res.data.user);
            this.setState({
                auth: res.data.auth,
                user: res.data.user,
                currentPage: 'home',
            });
        }).catch(err => console.log(err));
     }


    handleRegisterSubmit(e, username, firstname, lastname, password, email, user_type) {
        console.log(username);
        e.preventDefault();
        axios.post('/auth', {
            username,
            firstname,
            lastname,
            password,
            email,
            user_type,
        }).then(res => {
            this.setState({
                auth: res.data.auth,
                user: res.data.user,
                currentPage: 'home',
            });
        }).catch(err => console.log(err));
    }

    logOut() {
        axios.get('/auth/logout')
        .then(res => {
            console.log(res);
            this.setState({
                auth: false,
                currentPage: 'home',
                user:null,
            });
        }).catch(err => console.log(err));
    }

// Handle Create Project

handleCreateProject(e, name, description, category, status, planned_start_date, planned_end_date) {
  e.preventDefault();
  console.log("Im here");
  axios.post('/project', {
    name,
    description,
    category,
    status,
    planned_start_date,
    planned_end_date,
  }).then(res => {
    this.setState({
      user: res.data.user,
      project: res.data,
    })
  }).catch(err => console.log(err));
}

// View Single Project

  viewProject() {
    console.log("Im here");
    axios.get('/project/:id')
    .then(res => {
      this.setState({
        user: res.data.user,
        project: res.data,
      })
    }).catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Login handleLoginSubmit={this.handleLoginSubmit} username={this.username} password={this.password} />
        <Register handleRegisterSubmit={this.handleRegisterSubmit} username={this.username}
        firstname={this.firstname} lastname={this.lastname} password={this.password} email={this.email}
        user_type={this.user_type}  />
        <ProjectCreate handleCreateProject={this.handleCreateProject}/>
        {this.state.project ?
        <ProjectView project={this.state.project}/>
        : ''
        }
        {this.state.project ?
        <ViewUserProjects viewProject={this.viewProject} project={this.state.project} />
        : ''
        }
        <UserProfile />
        <UserProfileAll />

        {/* <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div> */}
        <Footer />
      </div>
    );
  }
}

export default App;
