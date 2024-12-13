import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice'; // Import login action
import { useNavigate } from 'react-router-dom';
import {isTokenExpired} from '../utils/authUtils'; 

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
      console.log("response", response)
      const token = response.data.access_token;
      
      // Check token expiration
      if (isTokenExpired(token)) {
        setError('Token has expired. Please log in again.');
        return;
      }
      // Save user info in Redux or localStorage
      dispatch(login({ email, token: response.data.token }));
      localStorage.setItem('token', response.data.token); // Optional

      navigate('/main'); // Redirect to invoices page
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
