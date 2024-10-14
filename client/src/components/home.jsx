import History from "./history";
import Chat from "./chat";
import Response from "./response";
import { useEffect, useState } from "react";
import '../App.css'
import { useLocation } from "react-router-dom";

const Home = () => {
    
    const [sentQuestion, setQuestionFlag] = useState(false);
    
    const location = useLocation();
    
    
    useEffect(() => {
        setQuestionFlag(location.state);
    })
    
    return(
        <>               
        <div className='user'>
        Joshua Pillay
        </div>
        {sentQuestion ? <Response/> : <History/>}
        <Chat/>
        </>
    )
}

export default Home;