import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faMoneyBill, faComments, faUsers, faShareAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Superpage</h2>
      <ul>
        <li>
        <FontAwesomeIcon icon={faComments} />
          <span> AI Chat</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faUsers} />
          <span>Members</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faCogs} />
          <span>Integrations</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faShareAlt} />
          <span>Refer friends</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faMoneyBill} />
          <span>Pricing Plans</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faCogs} />
          <span>Settings</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
