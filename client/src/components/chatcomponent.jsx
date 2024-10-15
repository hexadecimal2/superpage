const ChatComponent = () => {

const handleKeyPress = (e) => {


    const question = document.getElementById('questionBox').value;

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

        console.log(requestOptions)

        fetch('http://localhost:5000/question', requestOptions).then((response) => 
            response.json()
        ).then((data) => {

            console.log(data);

        })
        
        
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