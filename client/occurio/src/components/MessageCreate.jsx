import React, { Component } from 'react';
import axios from 'axios';

class Message extends Component {
  constructor() {
    super();
    this.state = {
      userDataLoaded: false,
      sender:null,
      message: 0,
      reciever: null,
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
    this.loadUsersDropDown();
    axios.get('/messages')
      .then(res=> {
        this.setState({
          userDataLoaded: true,
          user: this.props,
          sender:1,
        })
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
        console.log(res.data.data);
        this.setState({
          usersList: res.data.data,
          usersListLoaded: true,
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
    console.log(name, "--",value)
  }

  handleMessageSubmit(e, sender, message, reciever) {
    e.preventDefault();
    console.log(sender, message, reciever);
    axios.post('/messages', {
      sender,
      message,
      reciever,
      reciever,
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
            this.state.sender,
            this.state.message,
            this.state.reciever,
          )}>
          <div>
            <label className="labelInput">Collaborator</label>
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
      </div>
    )
  }
}


export default Message;
