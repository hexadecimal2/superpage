import { useNavigate } from "react-router-dom";

const ChatComponent = () => {

const navigate = useNavigate();

const handleKeyPress = (e) => {


    const question = document.getElementById('questionBox').value;

    if (question === ''){
        alert('Please fill in a question')
    }
    else{


    if (e.key === 'Enter'){
        
        const requestOptions = {
            method : "POST",
            headers: {"Content-Type" : "application/json"},
            body : JSON.stringify(
                {
                    Question : question
                }
            ),
            credentials : 'include'
            
        }

        fetch('http://localhost:5000/question', requestOptions).then((response) => 
            response.json()
        ).then((data) => {

            navigate('/home', {state : {Data : data, Question : question }})
            document.getElementById('questionBox').value = '';
        })
        
        
    }
    }
}


return(

    <div className="chatComponent">
    <input id="questionBox" onKeyUp={(e) => handleKeyPress(e)}  type="text" placeholder="chatbox"/>
    {/* send button symbol thingy goes here*/}
    
    </div>
)

}

export default ChatComponent;