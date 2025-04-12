import React, { useState } from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";
import { FaUser, FaSearch, FaHeart, FaShoppingCart } from 'react-icons/fa';
import SignUpForm from './user/SignUp';
import Login from './user/Login';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false); //Toggle visibility of the search input
  const [showAuthModal, setShowAuthModal] = useState(false); // Controls whether the auth model is shown up
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Navigation Links */}
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/shop" className="nav-link">Shop</Link></li>
          <li><Link to="/blog" className="nav-link">Blog</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
          <li><Link to="/contact" className="nav-link">Contact</Link></li>
        </ul>

        {/* Right Side Icons */}
        <div className="nav-icons">
          {/* User Icon - Opens Auth Modal */}
          <button className="icon-btn" onClick={() => setShowAuthModal(true)}>
            <FaUser className="icon" />
          </button>

          {/* Search Icon */}
          <button className="icon-btn search-btn" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <FaSearch className="icon" />
          </button>

          {/* Search Input (Toggle Visibility) */}
          {isSearchOpen && <input type="text" placeholder="Search......." className="search-input" />}

          {/* Favourites Icon */}
          <button className="icon-btn">
            <FaHeart className="icon" />
          </button>

          {/* Shopping Cart Icon */}
          <button className="icon-btn">
            <FaShoppingCart className="icon" />
          </button>
        </div>
      </div>

      {/* Authentication Modal (Login & Signup Toggle) */}
      {showAuthModal && (
        <div className="auth-popup">
          <div className="auth-overlay" onClick={() => setShowAuthModal(false)}></div>
          <div className="auth-content">
            {isLogin ? <Login /> : <SignUpForm />}
            
            {/* Toggle between Login and Signup */}
            <p className="toggle-text">
              {isLogin ? "Don't have an account?" : "Already have an account?"}  
              <span onClick={() => setIsLogin(!isLogin)} className="toggle-link">
                {isLogin ? " Sign up" : " Log in"}
              </span>
            </p>

            {/* Close Button */}
            <button className="close-btn" onClick={() => setShowAuthModal(false)}>X</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

