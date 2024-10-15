import Dashboard from "../components/dashboard";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Response from "../components/response";
import { useEffect, useState } from "react";
import ChatComponent from "../components/chatcomponent";
import '../App.css'

const Home = () => {

const [sentQuestion, setQuestionBool] = useState(false);

return(
<div className="homeComponent">
<Sidebar/>
<div className="contentArea">
<Header/>
{sentQuestion ? <Response/> : <Dashboard/>}
<ChatComponent/>
</div>
</div>

)
}

export default Home;