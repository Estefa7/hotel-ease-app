import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthProvider';
import api from '../api/axiosInstance';

function LoginPage() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post('/admins/auth/login', formData);
    const admin = res.data.admin;

    const userToStore = {
      id: admin._id,             // 👈 переименовываем _id в id
      username: admin.username,
      role: admin.role
    };

    // ✅ Save to localStorage
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(userToStore));
    localStorage.setItem('adminId', admin._id);

    // ✅ Update context
    setUser(userToStore);

    navigate('/');
  } catch (err) {
    setError('Invalid username or password');
  }
};



  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div className="mb-3">
          <label>Username</label>
          <input
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary">Log In</button>
      </form>
    </div>
  );
}

export default LoginPage;
