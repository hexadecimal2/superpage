const Response = (props) => {

return(
<>

<div className="responseComponent">
 <h4>{props.question} </h4>
 <h2>{props.answer}</h2>
</div>

</>

)

}

export default Response;