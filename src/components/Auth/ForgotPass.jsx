import React, { useState } from "react";
import { resetPassword } from "../../services/authService";

const ForgotPass = ({ onSwitchForm }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      setMessage("Password reset email sent. Please check your inbox.");
      setError("");
    } catch (error) {
      setError("Failed to send reset email. Please try again.");
      setMessage("");
    }
  };

  return (
    <div className="w-full p-5 shadow-md rounded-[12px]">
      <h2 className="text-2xl font-md text-center text-blue-500 mb-[30px]">
        Forgot Password
      </h2>
      <p className="text-gray-600 text-center mb-6">
        We will send a link to your email to help you reset your password
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 mb-4 border border-gray-300 rounded-xl text-base placeholder-gray-400"
          required
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white font-medium text-base rounded-xl hover:bg-blue-600 transition duration-300"
        >
          Confirm
        </button>
      </form>
      {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
      <div className="mt-6 text-center">
        <span
          onClick={() => onSwitchForm("signin")}
          className="w-full mt-6 p-3 text-gray-500 font-semibold text-base rounded-xl hover:bg-gray-100 transition duration-300"
        >
          Cancel
        </span>
      </div>
    </div>
  );
};

export default ForgotPass;
