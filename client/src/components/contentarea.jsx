import { useEffect, useState } from "react";
import Dashboard from "./dashboard";
import Response from "./response";
import { useLocation } from "react-router-dom";


const ContentArea = (props) => {

    const location = useLocation();

    const [showResponse, setShowResponse] = useState(false)

    useEffect(() => {

        if (Object.hasOwn(location.state, 'Data')){
        setShowResponse(true);
        } else {
            setShowResponse(false);
        }
    
    } , [location.state])

    return(
        <>
        
        {showResponse ? <Response/> : <Dashboard/>}
        
        </>
    );


}

export default ContentArea;