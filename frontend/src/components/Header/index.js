import {Link} from 'react-router-dom'

// component level style import
import "./Header.css"

const headerImage = "https://media.istockphoto.com/photos/group-portrait-of-a-creative-business-team-standing-outdoors-three-picture-id1146473249?b=1&k=20&m=1146473249&s=612x612&w=0&h=-q1guVCuei7X3BFKwWC2bLUOX8BeIaC04pG5s_xfn_c="

const brandImage = "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"

const Nav = () => {
    return (<nav className="Nav">
        <Link to="/" >
	        <img src={brandImage}/>
        </Link>
        <div>Route Finder App</div>
    </nav>)
}

const Header = ({ heroImage }) => {
    return (
        <header>
        {/* <header style={{ height: "20rem", overflow: "hidden" }}>  */}
        <Nav />  
        {/* <img 
            src={heroImage || headerImage} 
            style={{width: "100%",}}    
        /> */}
    </header>
    )
}

export default Header
