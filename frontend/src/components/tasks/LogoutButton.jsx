import { useAuth } from "../../context/AuthContext";

function LogoutButton() {
    const { logout } = useAuth();
    return ( 
        <button
        onClick={logout}
        className=" border-2 border-blue-400 bg-black/20 rounded-2xl"
      >
        <img src="./logout-icon.svg" className="w-[45px] text-white" alt="" />
      </button>
     );
}

export default LogoutButton;