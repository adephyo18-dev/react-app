import React from 'react';
import './LoginComponent.css';

function LogInComponent() {

  const [showPassword, setShowPassword] = React.useState(false);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="login-container">
      <p>Hello, welcome to my website</p>
      <input 
        type="text" 
        placeholder="Email" 
        className="login-input"/>
        <div>
          <input 
            type={showPassword ? 'text' : 'password'} 
            placeholder="Password" 
            className="login-input" />
          <button
            className="show-password-button"
            onClick={toggleShowPassword}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

      <button 
        className="login-button">Log In
      </button>
      <button 
        className="login-button">Sign Up
      </button>
    </div>
  );
}

export default LogInComponent;