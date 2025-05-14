import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as apiLogin } from "../libs/api/auth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useAuth } from "../context/AuthContext";

const MySwal = withReactContent(Swal);

function Login() {
  const [formData, setFormData] = useState({ emailOrUsername: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showAlert = (title, text, icon = "error") => {
    MySwal.fire({
      title,
      text,
      icon,
      confirmButtonColor: "#007AFF",
      background: "#1f1f1f",
      color: "#fff",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.emailOrUsername || !formData.password) {
      showAlert("Validation Error", "Please fill in both fields.", "warning");
      return;
    }
  
    try {
      const res = await apiLogin(formData);
      login(res.data.token);
  
      await MySwal.fire({
        title: "Welcome Back!",
        text: "You have successfully logged in.",
        icon: "success",
        confirmButtonColor: "#007AFF",
        background: "#1f1f1f",
        color: "#fff",
      });
  
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      showAlert("Login Failed", "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center p-4 my-[-20px] h-screen">
      <div className="pb-18 pt-10 px-7 bg-[#007AFF54]/60 border-1 border-white rounded-3xl">
        <h1 className="text-7xl text-center font-bela text-white my-8">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-white items-center">
          <input
            type="text"
            name="emailOrUsername"
            value={formData.emailOrUsername}
            onChange={handleChange}
            className="px-8 py-1 bg-[#424242BA] font-poppins font-light text-center rounded-full border-1 border-white"
            placeholder="Username or Email"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="px-8 py-1 bg-[#424242BA] font-poppins font-light text-center rounded-full border-1 border-white"
            placeholder="Password"
          />
          <Link to="/forgot" className="font-bela text-center font-extralight text-xs mt-2 w-fit md:text-sm">
            Forgot Password?
          </Link>
          <Link to="/register" className="font-bela text-center font-extralight text-xs mt-2 w-fit md:text-sm">
            Create an Account?
          </Link>
          <button
            type="submit"
            className="mx-auto w-fit rounded-full mt-2"
            disabled={!formData.emailOrUsername || !formData.password}
          >
            <img src="./Login.svg" className="w-fit rounded-full" alt="Login" />
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;
