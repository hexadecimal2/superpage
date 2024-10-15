import { useNavigate } from "react-router-dom"

const SignUpComponent = () => {

    const navigate = useNavigate();

    return(
    
        <div className="signup">
    
            <form>
                
                <h1> Sign Up </h1>
                
                <input type="text" name="signUpName" id="signUpNameId" placeholder="Name"/>
                
                <br /><br />
                
                
                <input type="text" name="signUpEmail" id="signUpEmailId" placeholder="Email"/>
                
                <br /><br />

                <input type="password" name="signUpPassword" id="signUpPasswordId" placeholder="Password"/>
                
                <p onClick={() => {navigate('/login')}}> Already have an account? Log in here </p>
                
                <button>Sign Up</button>
            </form>
    
        </div>
    
    )
    
    }
    
    export default SignUpComponent