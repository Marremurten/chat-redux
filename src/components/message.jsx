import React from 'react';

const Message = (props) => {
    return (
        <div>
            <p>{props.message.author}</p>
            <p>{props.message.content}</p>
            <p>{props.message.created_at}</p>
            <br></br>
        </div>
    )
};

export default Message;