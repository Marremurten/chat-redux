import React, { Component } from 'react';
import Message from '../components/message'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMessages } from '../actions/index';
import MessageForm from './message_form'

class MessageList extends Component {

     fetchMessages = () => {
        this.props.fetchMessages(this.props.selectedChannel)
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      }

    componentWillMount() {
        this.fetchMessages()
        
      }

      componentDidUpdate() {
        this.scrollToBottom();
      }
      componentDidMount() {
        this.refresher = setInterval(this.fetchMessages, 5000);
      }


      componentWillUnmount() {
        clearInterval(this.refresher);
      } 
      
    render(){
        return(
            <div className="message-container">
                <div className="channel-content" >
                    {this.props.messages.map(message => {
                        return <Message message= {message} key = {message.created_at} />
                    })}
                </div>
                <div style={{ float:"left", clear: "both" }}
                ref={(el) => { this.messagesEnd = el; }}>
                </div>
                <div>
                <MessageForm/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    messages: state.messages,
    selectedChannel: state.selectedChannel
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchMessages }, dispatch);
  }

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);