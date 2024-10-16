import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const email = document.getElementById('loginEmailId').value;
    const password = document.getElementById('loginPasswordId').value;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({
        Email: email,
        Password: password,
      }),
    };

    fetch('https://superpage.onrender.com/getuser', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'nopassword') {
          alert('Please insert a password / valid email');
        }

        if (data.message === 'passwordnotvalid') {
          alert('Email / Password Incorrect');
        }

        if (data.message === 'passwordvalid') {
          alert('Success!');
          navigate('/home', { state: { Responses: data.Responses, Name: data.Name } });
        }
      });
  };

  return (
    <div className="login-box">
      <h1>Login</h1>
      <div className="input-box">
        <input type="text" id="loginEmailId" placeholder="Email" required />
      </div>
      <div className="input-box">
        <input type="password" id="loginPasswordId" placeholder="Password" required />
      </div>
      <p className="signup-link" onClick={() => navigate('/signup')}>
        Don’t have an account? Create one here
      </p>
      <button onClick={handleClick} className="submit-btn">Login</button>
    </div>
  );
};

export default LoginComponent;
