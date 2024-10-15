import { useNavigate } from "react-router-dom"

const LoginComponent = () => {

    const navigate = useNavigate();


    const handleClick = () => {

        const email = document.getElementById('loginEmailId').value;
        const password = document.getElementById('loginPasswordId').value;
        
 
         const requestOptions = {
             method : "POST",
             headers: {"Content-Type" : "application/json"},
             credentials: 'include',
             body: JSON.stringify(
             {
                 //what we're sending goes here
                 Email : email,
                 Password : password
 
             })
         }
   
        fetch('http://localhost:5000/getuser', requestOptions).then((response) => response.json()).then((data) =>  {
        if (data.message === 'nopassword'){
         alert('Please insert a password / valid email');
        }
 
        if (data.message === 'passwordnotvalid'){
         alert('Email / Password Incorrect')
        }
 
        if (data.message === 'passwordvalid'){
         alert('Success!');
         alert(data);
         
         navigate('/home', {state : {Responses : data.Responses, Name : data.Name}});
        }
 
        });


    }

    return(

   

    <div className="login">
            
            <h1> Login </h1>
            
            <input type="text" name="loginEmail" id="loginEmailId" placeholder="Email"/>
            
            <br /><br />
            
            <input className="loginPassword" type="password" name="loginPassword" id="loginPasswordId" placeholder="Password"/>
        
            <p onClick={() => {navigate('/signup')}}> Dont have an account? Create one here </p>
                
            <button onClick={ () => handleClick()}>Login</button>


    </div>

)

}

export default LoginComponent