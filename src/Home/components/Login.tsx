import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styling/Auth.scss';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        setMessage('✅ Login successful!');
        setForm({ email: '', password: '' });

        // Redirect to home page
        window.location.href = '/';
      } else {
        setMessage(data.message || '❌ Login failed.');
      }
    } catch {
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
        Don’t have an account?{' '}
        <Link to="/register" className="auth-link">
          Create one
        </Link>
      </p>
    </form>
  );
};

export default Login;
