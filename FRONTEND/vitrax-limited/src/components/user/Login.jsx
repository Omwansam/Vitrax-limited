// src/components/user/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';


const BASE_URL = 'http://127.0.0.1:5000';

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSuccess = (responseData) => {
    const { access_token, refresh_token, user } = responseData;
    
    login(user, {
      access_token,
      refresh_token
    });

    const redirectTo = location.state?.from?.pathname || (user.role === 'admin' ? '/admin/dashboard' : '/');
    navigate(redirectTo);

    if (onLoginSuccess) onLoginSuccess();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      // Try admin login first
      try {
        const adminResponse = await axios.post(`${BASE_URL}/auth/admin/login`, formData);
        handleLoginSuccess(adminResponse.data);
        return;
      } catch (adminError) {
        // Only proceed to user login if it's a 401 (unauthorized)
        if (!adminError.response || adminError.response.status !== 401) {
          throw adminError;
        }
      }

      // Try user login if admin login failed
      const userResponse = await axios.post(`${BASE_URL}/auth/login`, formData);
      handleLoginSuccess(userResponse.data);
    } catch (error) {
      setErrors({
        api: error.response?.data?.message || 'Invalid email or password',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome Back</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <div className="relative">
              <FaEnvelope className="input-icon" />
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="relative">
              <FaLock className="input-icon" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          {errors.api && <p className="error-text">{errors.api}</p>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? <LoadingSpinner small /> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
