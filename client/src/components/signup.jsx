import { useNavigate } from "react-router-dom";


const SignUp = () => {

const navigate = useNavigate();

return(
<>
<h1> Sign Up </h1>
<form id="signUpForm">
    <input type="text" id="signUpName" name="sName" placeholder="Name" required/>
    <br /><br />
    <input type="text" id="signUpEmail" name="sEmail" placeholder="Email" required/>
    <br /><br />
    <input type="text" id="signUpPassword" name="sPass" placeholder="Password" required/>
    <br /><br />
    <input type="text" id="signUpConfirmPassword" name="sPassConfirm" placeholder="Confirm Password" required/>
    <br /><br />
    <input type="button" value="Sign Up"/>
    <p onClick = {() => {navigate('/Login')}}>  Have an account? Login</p>

</form>
</>
);

}

export default SignUp;