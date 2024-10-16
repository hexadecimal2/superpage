const DashboardMessage = (props) => {
    return (
      <>
        <div className="dashboardMessageComponent">
          <h2 className="dashboardQuestion">{props.question}</h2>
          <h3 className="dashboardResponse">{props.response}</h3>
        </div>
      </>
    );
  };
  
  export default DashboardMessage;
  