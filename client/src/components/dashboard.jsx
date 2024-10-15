import { useLocation } from "react-router-dom";
import DashboardMessage from "./dashboardmessage";
import Response from "./response";
import Header from "./header";

const Dashboard = (props) => {

const location = useLocation();
console.log(location.state)


if (Object.hasOwn(location.state, 'Data')){
    console.log(location.state)
return(
<>

<Header name={location.state.Data.Name}/>
<Response question={location.state.Question} answer={location.state.Data.Response}/>
</>
)
} 
else {   
return(
<div className="dashboardContainer">
<Header name={location.state.Name}/>
{location.state.Responses.map((prompt, index) => (
    <div key={index} className='dashboardComponent'>
        <DashboardMessage question={prompt.question} response={prompt.response}/>
    </div>
))}
</div>

)

}}

export default Dashboard;