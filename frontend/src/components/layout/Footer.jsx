import { useAuth } from "../../context/AuthContext";

function Footer() {
    const { logout } = useAuth();

    return (
      <div className="hidden sm:flex justify-center items-end px-4">
        <button
          onClick={logout}
          className="bg-black/60 border border-white rounded-2xl"
        >
          <img src="./logout-icon.svg" className="w-[65px] text-white" alt="" />
        </button>
      </div>
      );
}

export default Footer;
