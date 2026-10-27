import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import './ChatInput.css';

export function ChatInput({ chatMessages, setChatMessages }) {

  const [inputText, setInputText] = useState('');

  function saveInputText(event){
    const inputText = event.target.value;
    setInputText(inputText);
  }

  async function sendMessage() {

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user"
      }
    ];

    setChatMessages(newChatMessages);

    try
    {
      
      const response = await Chatbot.getResponseAsync(inputText);

       setChatMessages([
        ...newChatMessages,
        {
          message: response,
          sender: "robot"
        }
      ]);
    }
    catch (error) {
      console.error("Error fetching response from chatbot:", error);
    }   

    setInputText('');
  }

      
    function handleKeyDown(event) {
      if (event.key === 'Enter') {
        sendMessage();
      }
      if(event.key === 'Escape') {
        setInputText('');
      }
    }
  
    return (
      <div className="chat-input-container">
        <input 
          type="text" 
          placeholder="Send a message to chatbot..." 
          size="30" 
          onChange= {saveInputText}
          value={inputText}
          onKeyDown= {handleKeyDown}
          className="chat-input"
        />
        <button 
          onClick={sendMessage}
          className="send-button"
          >
          Send
        </button>
      </div>
    );
  }
  