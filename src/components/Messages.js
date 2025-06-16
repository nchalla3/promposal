import React from 'react';

const Messages = ({ onPromposalClick, onBirthdayClick, onGraduationClick }) => {
  return (
    <div className="messages-container">
      <h1 className="messages-header">Messages to Ella</h1>
      <div className="messages-buttons">
        <button className="message-button promposal" onClick={onPromposalClick}>
          Promposal 💝
        </button>
        <button className="message-button birthday" onClick={onBirthdayClick}>
          Birthday 🎂
        </button>
        <button className="message-button graduation" onClick={onGraduationClick}>
          Graduation 🎓
        </button>
      </div>
    </div>
  );
};

export default Messages;
