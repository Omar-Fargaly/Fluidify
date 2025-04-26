import { Link } from "react-router-dom";
import Logo from "../globals/Logo";
import Navigation from "../Navigation";

function Header() {
    return ( <>
    <nav className="flex flex-col gap-8 px-10 h-screen items-center py-8 bg-green-800 text-white">
        <Link to="/"><Logo /></Link>
        <Navigation />
    </nav>
    </> );
}

export default Header;
