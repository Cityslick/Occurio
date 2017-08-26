import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Reset.css';
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
import ProjectEdit from './components/ProjectEdit.jsx';
import ProjectViewAll from './components/ProjectViewAll.jsx';
// TASKS
import Task from './components/Task.jsx';
import TaskList from './components/TaskList.jsx';
//COLLABORATORS
import CollaboratorList from './components/CollaboratorList.jsx';
import Collaborator from './components/Collaborator.jsx';
// USERS
import UserProfile from './components/UserProfile.jsx';
import UserProfileAll from './components/UserProfileAll.jsx';
import UserProfileEdit from './components/UserProfileEdit.jsx';

// TEST
import Todolist from './components/sidenavtest.js'
class App extends Component {
  constructor() {
    super();
    this.state = {
        auth: false,
        user: null,
        fireRedirect: false,
        apiDataloaded:false,
        currentPage: 'home',
        loggedIn: false,
        toggleNav: false
    }
    // AUTH
    this.logOut =  this.logOut.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit =this.handleRegisterSubmit.bind(this);
    // Create Project
    this.handleCreateProject = this.handleCreateProject.bind(this);
    // Create Tasks
    this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
    // custom
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
  }
  handleLoginSubmit(e, username, password) {
      e.preventDefault();
      axios.post('/auth/login', {
          username,
          password,
      }).then(res => {
        this.setState({
            auth: res.data.auth,
            user: res.data.user,
            fireRedirect: true,
            loggedIn: (res.data.user),
        });
         //window.location = "/home";
        console.log("logging in...");
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
// Adding Tasks
  handleTaskSubmit(e, user_id, proj_id, name, description, start_date, end_date, status, ticket) {
    alert("ssduuidjasdjosp");
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
          window.location = "/home";
      // }).catch(err => console.log(err));
  }
  handleToggleNav(toggleNav){
    // run code here depending if toggle nav is true or false
    // make the state of the nav bar depend on toggle nav
  }
  openNav() {
    document.getElementById("mySidenav").style.width = `100%`;
  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <main>
            <Route exact path='/' render={() => <Home />} />
            <Route exact path='/collaborators' render={() => <Collaborator />} />
            <Route exact path='/login' render={() => {
              if(this.state.loggedIn){
                return <Redirect to={`user/id/:${this.state.user.id}`} Component={() =>
                ( <UserProfile user={this.state.user} /> )
                  } />
                }
              else
                return <Login handleLoginSubmit={this.handleLoginSubmit} />
              }} />
            <Route exact path='/register' render={() => <Register handleRegisterSubmit={this.handleRegisterSubmit}
              username={this.props.username}
              firstname={this.firstname}
              lastname={this.lastname}
              password={this.password}
              email={this.email}
              user_type={this.user_type} />}
            />
             <Route exact path="/user/id/:id" render={() => {
               if(!this.state.loggedIn)
                  return <Login/>
                else
                  return <UserProfile  loggedIn={this.state.auth} user={this.state.user}/>
               }}/>
            <Route exact path="/CollaboratorList" render={() => <CollaboratorList proj_id={2}/>} />

            <Route exact path="/taskList" render={() => <TaskList proj_id={1} user_id={12}  proj={false} />} />
            <Route exact path="/user" render={() => <UserProfile user={this.user} />} />

            <Route exact path="/userEdit/:id" render={(props) => <UserProfileEdit  userData={this.state.user} />} />
            <Route exact path="/projectList" render={() => <ProjectViewAll  for_User={true} user={this.state.user}/>} />
            <Route exact path="/project" render={() => <ProjectCreate handleCreateProject={this.handleCreateProject} user={this.state.user} />} />
            <Route exact path="/projectEdit/:id" render={(props) => <ProjectEdit id={props.match.params.id} project={this.project} />} />
            <Route exact path="/projectList/:id" render={(props) => <ProjectView id={props.match.params.id}   presentDetail={true} project={this.project} />} />
            <Route exact path="/projectTask/:id" render={(props) => <Task proj_id={props.match.params.id}  />} />
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}
export default App;
