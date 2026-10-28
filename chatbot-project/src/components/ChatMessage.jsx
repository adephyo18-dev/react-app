import RobotAvatar from '../assets/robot.png'
import UserAvatar from '../assets/user.png'
import './ChatMessage.css';
import dayjs from 'dayjs'

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
          <div className="chat-message-timestamp">
            {dayjs().format('HH:mm')}
          </div>
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

 