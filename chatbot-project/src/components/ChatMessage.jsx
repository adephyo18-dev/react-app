import RobotAvatar from '../assets/robot.png'
import UserAvatar from '../assets/user.png'
import './ChatMessage.css';

export function ChatMessage({ message, sender }) {
  return (
    <div className={`chat-message-${sender}`}>
        { sender === "robot" && (
            <img src={RobotAvatar} 
            alt={sender} 
            className="chat-message-avatar"
            />
        )}
        <div className="chat-message-text">
          {message}
        </div>
        { sender === "user" && (
            <img src={UserAvatar}
            alt={sender} 
            className="chat-message-avatar"
            />
        )}
    </div>
  );
}

 