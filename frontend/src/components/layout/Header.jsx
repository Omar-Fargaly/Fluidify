import { Link } from "react-router-dom";
import Logo from "../globals/Logo";
import Navigation from "../Navigation";

function Header() {
    return ( <>
    <nav className="flex justify-between px-8 py-4 items-center bg-green-900 text-white">
        <Link to="/"><Logo /></Link>
        <Navigation />
    </nav>
    </> );
}

export default Header;