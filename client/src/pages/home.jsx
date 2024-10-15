import Sidebar from "../components/sidebar";
import ChatComponent from "../components/chatcomponent";
import '../App.css'
import Dashboard from "../components/dashboard";

const Home = () => {

return(
    
<div className="homeComponent">
<Sidebar/>
<div className="contentArea">
<Dashboard/>
<ChatComponent/>
</div>
</div>

)
}

export default Home;