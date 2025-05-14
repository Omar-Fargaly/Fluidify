import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../libs/api/auth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Forgot() {
  const [email, setEmail] = useState("");

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

    if (!email) {
      showAlert("Missing Email", "Please enter your email address.", "warning");
      return;
    }

    try {
      const response = await forgotPassword({ email });
      console.log("Success:", response.data);

      await MySwal.fire({
        title: "Email Sent!",
        text: "Check your inbox for password reset instructions.",
        icon: "success",
        confirmButtonColor: "#007AFF",
        background: "#1f1f1f",
        color: "#fff",
      });

      setEmail(""); // Clear form after success
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      showAlert(
        "Request Failed",
        error.response?.data?.message || "Could not send reset email. Please try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center p-4 my-[-20px] h-screen">
      <div className="pb-18 pt-16 px-7 bg-[#007AFF54]/60 border-1 border-white rounded-3xl">
        <h1 className="text-7xl text-center font-bela text-white my-8">
          Forgot?
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 text-white items-center"
        >
          <input
            type="email"
            name="email"
            placeholder="Email with Account"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-8 py-1 point bg-[#424242BA] font-poppins font-light text-center rounded-full border-1 border-white"
          />
          <Link
            to="/login"
            className="font-bela text-center font-extralight text-xs md:text-sm mt-2"
          >
            Changed Your Mind?
          </Link>
          <button
            type="submit"
            className="mx-auto w-fit rounded-full mt-2"
          >
            <img
              src="./Forgot.svg"
              className="w-full rounded-full"
              alt="Submit"
            />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Forgot;
