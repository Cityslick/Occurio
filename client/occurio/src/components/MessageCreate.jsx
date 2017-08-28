import React, { Component } from 'react';
import axios from 'axios';

class Message extends Component {
  constructor() {
    super();
    this.state = {
      userDataLoaded: false,
      user_id: 0,
      message_id: 0,
      sentTo: null,
      new_id: null,
      messagesListData:null,
      messagesListDataLoaded:false,
      usersList:null,
      usersListLoaded:false,
      projectData:null,
      projectDataLoaded:false,
    }
    this.loadUsersDropDown = this.loadUsersDropDown.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.renderMessageForm = this.renderMessageForm.bind(this);
  }
  componentDidMount() {
    axios.get('/messages')
      .then(res=> {
        this.setState({
          userDataLoaded: true,
          user: this.props,
        })
      })
  }

  loadUsersDropDown(){
    axios.get(`/collaborator/${this.state.user_id}`)
    .then(res=>{
      if(res.data.data.length>0){
        this.setState({
          messagesListData: res.data.data,
          messagesListDataLoaded: true,
        })
      }
    }).catch(err=>{
      console.log(err.json);
    })
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
    console.log(value)
  }

  handleMessageSubmit(e, sender, message, reciever) {
    e.preventDefault();
    axios.post('/messages', {
      sender,
      message,
      reciever,
    }).then(res => {
      this.setState({

      })
    }).catch(err => console.log(err));
  }

  renderMessageForm() {
    return (
      <div className="messageform">
        <form onSubmit={(e) => this.handleMessageSubmit(
            e,
            this.state.user_id,
            this.state.message_id
          )}>
          <div>
            <label className="labelInput">Collaborator</label>
            <select id="user_id"  name="user_id" onChange={this.handleInputChange} >
              { (this.state.usersListLoaded) ?
              this.state.usersList.map((collaborator,index) => {
                return <option key={collaborator.id}
                name="user_id"  value={collaborator.id} >{collaborator.username}</option>
              })
             : ""}
            </select>
          </div>
          <label> Message
            <input type="text" name="name"  value={this.state.name} onChange={this.handleInputChange} required />
          </label>
          <div>
            <input className="form" type="submit" value="Send" />
          </div>
        </form>
      </div>
    )
  }

  render() {
    return (
      <div className='messageComponent'>
        {this.renderMessageForm()}
      </div>
    )
  }
}


export default Message;
