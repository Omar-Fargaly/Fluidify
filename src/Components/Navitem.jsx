import { Link } from "react-router-dom";

function Navitem({name, href}) {
    return (  
        <Link to={href}>{name}</Link>
    );
}

export default Navitem;