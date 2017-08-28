import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class MessagesAll extends Component {
  constructor() {
    super();
    this.state = {
      messagesLoaded: false,
      messages: null,
      user: this.props,
    }
    this.renderMessages = this.renderMessages.bind(this);
  }

  componentDidMount() {
    axios.get('/messages')
      .then(res=> {
        this.setState({
          messagesLoaded: true,
          messages: res.data.data,
          user: this.props,
        })
      })
    }


  renderMessages() {
    if (this.state.messageDataLoaded){
        return this.state.messages.map((message) => {
          return <div className="messages">
                  <h2>{message.name}</h2>
                  <Link className='viewProject'  to={`/messages/${message.id}`} >View Message</Link>
                  <br/>
                  <Link className='editProject' to={`/messages`}>All Messages</Link>
              </div>
        })}
  }

  render() {
    return (
      <div className='messageComponent'>
        {this.renderMessages()}
      </div>
    )
  }

}


export default MessagesAll;
