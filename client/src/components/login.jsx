import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";

const Login = () => {

const navigate = useNavigate();

return(
<>

<h1> Login </h1>
<form id="loginForm">
    <input type="text" id="email" name="email" placeholder="Email" required/>
    <br />
    <br />
    <input type="text" id="password" name="password" placeholder="Password" required/>
    <br />
    <br />
    <input type="button" value="Login"/>
    <p onClick={() => {navigate('/SignUp')}}> No account? Create one now</p>

</form>


</>

);

}

export default Login;