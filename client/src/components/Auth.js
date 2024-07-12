import { useState } from "react";

const Auth = () => {
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  console.log(email, password, confirmPassword);

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  }

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const response = await fetch(`http://localhost:8000/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    console.log(data);
    if (data.token) {
      document.cookie = `authToken=${data.token}; path=/`;
      document.cookie = `Email=${data.email}; path=/`;
      window.location.reload();
    } else {
      setError(data.detail);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLogin ? 'Please Log in' : 'Please Sign Up!'}</h2>
          <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
          {!isLogin && <input type="password" placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />}
          <input type="submit" className="create" onClick={(e) => handleSubmit(e, isLogin ? 'login' : 'signup')} />
          {error && <p>{error}</p>}
        </form>
      </div>
      <div className="auth-options">
        <button
          onClick={() => viewLogin(false)}
          style={{ backgroundColor: !isLogin ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188)' }}
        >Sign Up</button>

        <button
          onClick={() => viewLogin(true)}
          style={{ backgroundColor: !isLogin ? 'rgb(188, 188, 188)' : 'rgb(255, 255, 255)' }}
        >Login</button>
      </div>
    </div>
  );
}

export default Auth;
