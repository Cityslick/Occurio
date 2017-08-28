import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class MessagesSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageDataLoaded: false,
      message: null,
      user: props.user,
    }
    this.renderMessage = this.renderMessage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    axios.get(`/messages/${this.props.id}`)
      .then(res=> {
        this.setState({
          messageDataLoaded: true,
          message: res.data.data
        })
    })
  }

  handleDelete() {

  }

  renderMessage() {
    if (this.state.messageDataLoaded) {
        return <div className="message">
                  <h2>{this.state.message.name}</h2>
                  <p>{this.state.message.content}</p>
                  <form onSubmit={(e) => this.handleDelete( e, this.state.message.message_id)}>
                    <input className="form" type="submit" value="Delete" />
                  </form>
                </div>
              }
  }

  render() {
    return (
      <div className='messageComponent'>
        {this.renderMessage()}
      </div>
    )
  }
}


export default MessagesSingle;
