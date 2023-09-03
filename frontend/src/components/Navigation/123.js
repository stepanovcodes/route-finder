import { Link } from 'react-router-dom';
import './Navigation.css'; // Import your CSS file for Nav styles

const brandImage = "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"

const Navigation = () => {
    return (
        <nav className="Nav">
            <Link to="/">
                <img src={brandImage} alt="Brand Logo" />
            </Link>
            <ul className="NavLinks">
                <li>
                    <Link to="/locations">Locations</Link>
                </li>
                <li>
                    <Link to="/vehicles" className="NavLink">Vehicles</Link>
                </li>
                <li>
                    <Link to="/vehicles/settings" className="NavLink">Vehicle Settings</Link>
                </li>
                <li>
                    <Link to="/services" className="NavLink">Services</Link>
                </li>
                <li>
                    <Link to="/shipments" className="NavLink">Shipments</Link>
                </li>
                <li>
                    <Link to="/problems" className="NavLink">Create Routing Problem</Link>
                </li>
                <li>
                    <Link to="/solutions" className="NavLink">View Routing Solutions</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;