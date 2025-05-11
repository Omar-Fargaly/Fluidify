import { Link } from "react-router-dom";

function Navitem({name, href}) {
    return (  
        <Link to={href}>
            <img src={name} alt={name} className="w-[45px]" /></Link>
    );
}

export default Navitem;