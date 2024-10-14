// Content.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
const Chat = (props) => {
    
    const navigate = useNavigate();
    
    return (
        <div className="chat">

            <div className="input-container">
                <input onKeyDown={(e) => {if (e.key === "Enter"){
                navigate('/home', {state : true});    
                }}} type="text" placeholder="Write Coding about new HTML Tags" />
                <button>Send</button>
            </div>
            <div className="footer">Superpage AI Chat V1.2</div>
        </div>
    );
};

export default Chat;
