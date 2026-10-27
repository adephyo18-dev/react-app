import { useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css';

function ChatMessages({ chatMessages }) {

  const containerRef = useRef(null);

  useEffect(() => {

    const container = containerRef.current;

    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  },[chatMessages]);

  return (
    <div className="chat-messages-container"
      ref={containerRef}>
      {chatMessages.length === 0 && (
        <div className="chat-message-empty">
          No messages yet.
        </div>
      )}
      {chatMessages.map((chat, index) => (
        <ChatMessage 
          key={index}
          message={chat.message} 
          sender={chat.sender} 
        />
      ))}
    </div>
  );
}

export default ChatMessages;
