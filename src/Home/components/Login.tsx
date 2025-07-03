import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/slices/authSlice'; // Import your login action
import '../Styling/Auth.scss';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    console.log('🔐 Login attempt started...');
    
    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log('📡 Login response:', data);

      if (res.ok) {
        // Store in localStorage with consistent key names
        localStorage.setItem('token', data.data.accessToken); // Changed from 'accessToken' to 'token'
        localStorage.setItem('refreshToken', data.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        console.log('💾 Stored in localStorage:');
        console.log('Token:', data.data.accessToken);
        console.log('User:', data.data.user);
        
        // Update Redux store
        dispatch(login({
          token: data.data.accessToken,
          user: data.data.user,
          refreshToken: data.data.refreshToken
        }));
        
        console.log('🔄 Redux store updated');
        
        setMessage('✅ Login successful!');
        setForm({ email: '', password: '' });

        // Use navigate instead of window.location.href to avoid full page refresh
        navigate('/');
      } else {
        console.error('❌ Login failed:', data.message);
        setMessage(data.message || '❌ Login failed.');
      }
    } catch (error) {
      console.error('💥 Login error:', error);
      setMessage('⚠️ An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign In</h2>

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Signing in…' : 'Sign In'}
      </button>

      {message && <p>{message}</p>}

      <p>
        Don't have an account?{' '}
        <Link to="/register" className="auth-link">
          Create one
        </Link>
      </p>
    </form>
  );
};

export default Login;