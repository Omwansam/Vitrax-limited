import React, { useState } from 'react';
import './SignUpForm.css';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaFacebookF, FaTwitter, FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const validatePassword = (password) => {
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return passwordPattern.test(password);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (!validatePassword(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters, include one uppercase letter, and one number.';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:5555/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            console.log('User registered:', data);
            alert('Registration successful!');
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
            setErrors({});
        } catch (error) {
            setErrors({ api: error.message });
        } finally {
            setLoading(false);
        }
        navigate('/'); // Redirect to login page after successful registration
    };

    return (
        <div className='signup-container'>
            <div className='signup-box'>
                <h2 className='signup-title'>Create Your Account</h2>
                <form className='signup-form' onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='username' className='form-label'>Username:</label>
                        <div className='relative'>
                            <FaUser className='input-icon' />
                            <input
                                type='text'
                                id='username'
                                name='username'
                                className='form-input'
                                placeholder='Enter your username'
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {errors.username && <p className="error-text">{errors.username}</p>}
                    </div>

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
                            <div className='password-toggle' onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                        {errors.password && <p className="error-text">{errors.password}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <div className="relative">
                            <FaLock className="input-icon" />
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                className="form-input"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <div className='password-toggle' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                    </div>

                    {errors.api && <p className="error-text">{errors.api}</p>}

                    <button type="submit" className='signup-button' disabled={loading}>
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>

                <div className='social-buttons'>
                    <button className='social-button'><FaFacebookF /></button>
                    <button className='social-button'><FaTwitter /></button>
                    <button className='social-button'><FaGithub /></button>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
