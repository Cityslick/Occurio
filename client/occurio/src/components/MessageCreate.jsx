import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MessagesAll from './MessagesAll';
import axios from 'axios';
import '../Messages.css';

class Message extends Component {
  constructor() {
    super();
    this.state = {
      userDataLoaded: false,
      sender:null,
      message: "",
      reciever: null,
      new_id: null,
      messagesListData:null,
      messagesListDataLoaded:false,
      usersList:null,
      usersListLoaded:false,
    }
    this.loadUsersDropDown = this.loadUsersDropDown.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.renderMessageForm = this.renderMessageForm.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
  }
  componentDidMount() {
    this.loadUsersDropDown();
    axios.post(`/messages/${this.props.user.id}`)
      .then(res=> {
        this.setState({
          userDataLoaded: true,
          user: this.props,
          messages: res.data.data,
          messageDataLoaded: true,
        })
        console.log("yo ninja!", this.state.messages);
      })
  }

  loadUsersDropDown(){
    let proj_id=0;
    let user_id=0;
    axios.put(`/collaborator`,{
       proj_id,
       user_id,})
       .then(res=>{
      if(res.data.data.length>0){
        console.log("",res.data.data);
        this.setState({
          usersList: res.data.data,
          usersListLoaded: true,
          reciever: res.data.data[0].id,
          sender:this.props.user.id,
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
  }

  handleMessageSubmit(e, sender, message, reciever) {
    e.preventDefault();
    console.log(sender, message, reciever);
    axios.post('/messages', {
      sender,
      message,
      reciever,
    }).then(res => {
      this.clearMessage();
    }).catch(err => console.log(err));
  }

  clearMessage() {
    this.setState({
      message: ''
    })
  }

  renderMessages() {
    if (this.state.messageDataLoaded){
        return this.state.messages.map((message) => {
          return <div className="message">
                  <h1>{message.message}</h1>
                  <br/>
                  <Link className='viewProject'  to={`/messages/${message.reciever}`} >View Message</Link>
                  <Link className='viewProject'  to={`/messages/${message.reciever}`} >Delete</Link>
                  <br/>
              </div>
        })}
  }

  renderMessageForm() {
    return (
      <div className="messageform">
        <form onSubmit={(e) => this.handleMessageSubmit(
            e,
            this.state.sender,
            this.state.message,
            this.state.reciever,
          )}>
          <div>
            <label className="labelInput">Send to:</label>
            <select id="reciever"  name="reciever" onChange={this.handleInputChange} >
              { (this.state.usersListLoaded) ?
              this.state.usersList.map((collaborator,index) => {
                return <option key={collaborator.id}
                name="reciever"  value={collaborator.id} >{collaborator.username}</option>
              })
             : ""}
            </select>
          </div>
          <label> Message
            <input type="text" name="message"  value={this.state.message} onChange={this.handleInputChange} required />
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
        <div className='messages'>
          {this.renderMessages()}
        </div>
      </div>
    )
  }
}


export default Message;
