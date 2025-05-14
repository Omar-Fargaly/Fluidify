import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  // useParams for handling token
import { resetPassword } from "../libs/api/auth";  // Adjust the import path if needed
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

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

    if (!newPassword || !confirmPassword) {
      showAlert("Missing Fields", "Please fill in both password fields.", "warning");
      return;
    }

    if (newPassword !== confirmPassword) {
      showAlert("Passwords Do Not Match", "Make sure the passwords are the same.", "warning");
      return;
    }

    try {
      const response = await resetPassword(token, newPassword);
      console.log("Success:", response.data);

      await MySwal.fire({
        title: "Password Reset Successful",
        text: "Your password has been reset. You can now log in with your new password.",
        icon: "success",
        confirmButtonColor: "#007AFF",
        background: "#1f1f1f",
        color: "#fff",
      });

      navigate("/login");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      showAlert("Request Failed", error.response?.data?.message || "Could not reset password. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center p-4 my-[-20px] h-screen">
      <div className="pb-18 pt-16 px-7 bg-[#007AFF54]/60 border-1 border-white rounded-3xl">
        <h1 className="text-7xl text-center font-bela text-white my-8">
          Reset
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 text-white items-center"
        >
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="px-8 py-1 point bg-[#424242BA] font-poppins font-light text-center rounded-full border-1 border-white"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-8 py-1 point bg-[#424242BA] font-poppins font-light text-center rounded-full border-1 border-white"
          />
          <button
            type="submit"
            className="mx-auto w-fit rounded-full mt-2"
          >
            <img
              src="/Forgot.svg"
              className="w-full rounded-full"
              alt="Submit"
            />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
