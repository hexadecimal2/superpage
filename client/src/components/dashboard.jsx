import { useLocation, useNavigate } from "react-router-dom";
import DashboardMessage from "./dashboardmessage";
import Response from "./response";
import Header from "./header";
import { useEffect } from "react";

const Dashboard = () => {

const location = useLocation();
const navigate = useNavigate();

const handleClick = (index) => {
    
    const requestOptions = {
        method : "POST",
        headers: {"Content-Type" : "application/json"},
        body : JSON.stringify(
            {
               ID : index 
            }
        ),
        credentials : 'include'
        
    }

    fetch('https://superpage.onrender.com/getresponse', requestOptions).then((response) => 
        response.json()
    ).then((data) => {
        console.log(data);
        navigate('/home', {state : {Data : {Response : data.Response, Name : data.Name}, Question : data.Question}})
    })
}

useEffect(() => {
    
    
    const requestOptions = {
        method : "POST",
        headers: {"Content-Type" : "application/json"},
        credentials: 'include',
    }
    
    
    fetch('https://superpage.onrender.com/getresponses', requestOptions).then((response) => response.json()).then((data) =>  {
         navigate('/home', {state : {Responses : data.Responses, Name : data.Name}});
        });

}, [navigate])

if (Object.hasOwn(location.state, 'Data')){
return(
<>

<Header name={location.state.Data.Name}/>
<Response question={location.state.Question} answer={location.state.Data.Response}/>
</>
)
} 
else {   
    return (
        <div className="dashboardContainer">
          <Header name={location.state.Name} />
          {location.state.Responses.map((prompt, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className="dashboardComponent"
            >
              <DashboardMessage question={prompt.question} response={prompt.response} />
            </div>
          ))}
        </div>
      );
      

}}

export default Dashboard;