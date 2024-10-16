import { useNavigate } from "react-router-dom";

const SignUpComponent = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        const name = document.getElementById('signUpNameId').value;
        const email = document.getElementById('signUpEmailId').value;
        const password = document.getElementById('signUpPasswordId').value;

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Name: name,
                Email: email,
                Password: password
            })
        };

        fetch('http://localhost:5000/add', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'success') {
                    navigate('/login');
                } else {
                    alert(data.message);
                }
            });
    };

    return (
        <div className="signup-box">
            <h1>Sign Up</h1>
            <div className="input-box">
                <input type="text" name="signUpName" id="signUpNameId" placeholder="Name" />
            </div>
            <div className="input-box">
                <input type="text" name="signUpEmail" id="signUpEmailId" placeholder="Email" />
            </div>
            <div className="input-box">
                <input type="password" name="signUpPassword" id="signUpPasswordId" placeholder="Password" />
            </div>
            <p className="login-link" onClick={() => { navigate('/login') }}>Already have an account? Log in here</p>
            <button className="submit-btn" onClick={handleClick}>Sign Up</button>
        </div>
    );
};

export default SignUpComponent;
