import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Redirect } from 'react-router';

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
import Task from './components/Task.jsx';
import TaskList from './components/TaskList.jsx';
// USERS
import UserProfile from './components/UserProfile.jsx';
import UserProfileAll from './components/UserProfileAll.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
        auth: false,
        user: null,
        fireRedirect: false,
        apiDataloaded:false,
        userDataLoaded: false,
        currentPage: 'home',
    }
    // AUTH
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit= this.handleRegisterSubmit.bind(this);
    this.logOut =  this.logOut.bind(this);
    // Create Project
    this.handleCreateProject = this.handleCreateProject.bind(this);
    // View Project
    // this.viewProject = this.viewProject.bind(this);
    // Create Tasks
    this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
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
                fireRedirect: true,
            });
            window.location = `/user/id/${this.state.user.id}`; // dont tell the router team :(
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

                fireRedirect: true,
                currentPage: 'home',
                userDataLoaded:true,
            });
            window.location = "/user";
        }).catch(err => console.log(err));
    }
    logOut() {
        axios.get('/auth/logout')
        .then(res => {
            console.log(res);
            this.setState({
                auth: false,
                user:null,
                fireRedirect: true,
            });
            window.location = "/home";
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
      fireRedirect: true,
    })
  }).catch(err => console.log(err));
}

// // View Users Projects
//   viewProjectsAll() {
//     console.log("Im here viewProjectsAll");
//     axios.get('/project')
//     .then(res => {
//       console.log(res);
//       this.setState({
//         user: res.data.user,
//         projects: res.data,
//         fireRedirect: true,
//       })
//     }).catch(err => console.log(err));
//   }

// View  Project
  viewProject() {
    console.log("Im here viewProject ");
    axios.get('/project/:id')
    .then(res => {
      console.log(res);
      this.setState({
        user: res.data.user,
        project: res.data,
        projectTasks: res.task,
        fireRedirect: true,
      })
    }).catch(err => console.log(err));
  }
// Adding Tasks
  handleTaskSubmit(e, user_id, proj_id, name, description, start_date, end_date, status, ticket) {
    e.preventDefault();
    axios.post('/task', {
      user_id,
      proj_id,
      name,
      description,
      start_date,
      end_date,
      status,
      ticket,
    }).then(res => {
      console.log(res);
      this.setState({
        task: res.data.task,
      })
    }).catch(err => console.log(err));
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          {/* <Home /> */}
          <main>
            <Route exact path='/home' render={() => <Home />} />
            <Route exact path='/login' render={() => <Login handleLoginSubmit={this.handleLoginSubmit} />} />
            <Route exact path='/register' render={() => <Register handleRegisterSubmit={this.handleRegisterSubmit}
              username={this.props.username}
              firstname={this.firstname}
              lastname={this.lastname}
              password={this.password}
              email={this.email}
              user_type={this.user_type} />} />
            <Route exact path="/task" render={() => <TaskList proj_id={1} user_id={12}  proj={false} />} />
            <Route exact path="/user" render={() => <UserProfile user={this.user} />} />
            <Route exact path="/collaborator" render={() => <ViewUserProjects />} />
            <Route exact path="/project" render={() => <ProjectCreate handleCreateProject={this.handleCreateProject} />} />
            <Route exact path="/project/:id" render={(props) => <ProjectView id={props.match.params.id} />} />
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}
export default App;
