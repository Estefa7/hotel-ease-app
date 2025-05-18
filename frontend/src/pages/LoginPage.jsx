import { useAuth } from '../components/auth/AuthProvider';

function LoginPage() {
  const { setUser } = useAuth();

  const handleLogin = () => {
    setUser({ name: 'Test User' }); // Replace with real auth logic
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
