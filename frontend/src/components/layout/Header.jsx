import { Link } from "react-router-dom";
import Logo from "../globals/Logo";
import Navigation from "../Navigation";

function Header() {
    return ( <>
    <nav className="hidden sm:flex flex-col justify-between items-center px-4 text-white  ">
        <Link to="/"><Logo className="w-[120px]" /></Link>
        <Navigation />
    </nav>
    </> );
}

export default Header;
