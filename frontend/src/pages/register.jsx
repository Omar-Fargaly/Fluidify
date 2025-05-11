import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register as apiRegister } from "../libs/api/auth"; // adjust path if needed
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

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
      confirmButtonText: "OK",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      showAlert("Validation Error", "Please fill in all fields.", "warning");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showAlert("Mismatch", "Passwords do not match.");
      return;
    }

    try {
      const res = await apiRegister({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", res.data.token);

      await MySwal.fire({
        title: "Success!",
        text: "Account created successfully.",
        icon: "success",
        confirmButtonColor: "#007AFF",
        background: "#1f1f1f",
        color: "#fff",
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      showAlert("Registration Failed", err.response?.data?.message || "Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center p-6 my-[-20px] h-screen">
      <div className="pb-18 pt-16 px-7 bg-[#007AFF54]/60 border-1 border-white rounded-3xl">
        <h1 className="text-6xl text-center font-bela text-white my-8">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-white items-center">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="px-8 py-1 bg-[#424242BA] font-poppins font-light text-center rounded-full border-1 border-white"
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="px-8 py-1 bg-[#424242BA] font-poppins font-light text-center rounded-full border-1 border-white"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="px-8 py-1 bg-[#424242BA] font-poppins font-light text-center rounded-full border-1 border-white"
            placeholder="Password"
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="px-8 py-1 bg-[#424242BA] font-poppins font-light text-center rounded-full border-1 border-white"
            placeholder="Confirm Password"
          />

          <Link
            to="/login"
            className="font-bela text-center font-extralight text-xs mt-2 w-fit md:text-sm"
          >
            Already Have an Account?
          </Link>
          <button
            type="submit"
            className="mx-auto w-fit rounded-full mt-2"
            disabled={!formData.name || !formData.email || !formData.password || !formData.confirmPassword} 
          >
            <img src="./Register.svg" className="w-fit rounded-full" alt="Register" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
