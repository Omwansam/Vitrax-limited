import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './UserAuthModal.css';
import Login from './user/Login';
import SignUpForm from './user/SignUp';

const UserAuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>
        {isLogin ? (
          <Login onLoginSuccess={onClose} /> // Closes modal after login
        ) : (
          <SignUpForm onClose={onClose} />
        )}
        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}  
          <span onClick={() => setIsLogin(!isLogin)} className="toggle-link">
            {isLogin ? " Sign up" : " Log in"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserAuthModal;

