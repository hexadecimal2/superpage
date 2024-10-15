import { useNavigate } from "react-router-dom"

const LoginComponent = () => {

    const navigate = useNavigate();


 return(

   

    <div className="login">

        <form>
            
            <h1> Login </h1>
            
            <input type="text" name="loginEmail" id="loginEmailId" placeholder="Email"/>
            
            <br /><br />
            
            <input className="loginPassword" type="password" name="loginPassword" id="loginPasswordId" placeholder="Password"/>
        
            <p onClick={() => {navigate('/signup')}}> Dont have an account? Create one here </p>
                
            <button onClick={ () => {navigate('/home')}}>Login</button>
        
        </form>

    </div>

)

}

export default LoginComponent