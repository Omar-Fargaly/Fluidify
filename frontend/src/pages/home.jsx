import { Link } from "react-router-dom";
import Logo from "../components/globals/Logo";


function Home() {
  return (
    <>
    <section style={{background: "radial-gradient(circle,rgba(0, 139, 245, 1) 0%, rgba(12, 44, 70, 1) 50%, rgba(0, 0, 0, 1) 100%)"}}>
      <div className="container h-screen flex justify-center items-center px-20 mx-auto">
        <Link to="/dashboard">
        <Logo className="w-full max-w-[400px] rounded-[10rem]" />
        </Link>
      </div>
      </section>
    </>
  );
}
export default Home;
