import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signInWithGoogle } from "../../services/authService";

import GoogleIcon from "../../assets/auth/GoogleIcon.svg";
import SignUpIcon from "../../assets/auth/signup.svg";
import ShowHideIcon from "../../assets/auth/show-hide.svg";

const SignIn = ({ onSwitchForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(false);
    try {
      await signIn(email, password);
      navigate("/conversation");
    } catch (err) {
      console.error("Error signing in with email/password:", err);
      setErr(true);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/conversation");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setErr(true);
    }
  };

  return (
    <div className="w-full p-5 shadow-md rounded-[12px]">
      <h2 className="text-2xl font-semibold text-center text-blue-500 mb-[30px]">
        Sign In
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 mb-4 border border-gray-300 rounded-xl text-base placeholder-gray-400"
        />
        <div className="relative">
          <input
            required
            type={passwordShown ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 mb-4 border border-gray-300 rounded-xl text-base placeholder-gray-400"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={togglePasswordVisibility}
          >
            <img
              src={ShowHideIcon}
              alt="ShowHidePassIcon"
              className="h-5 w-5 text-gray-400"
            />
          </button>
        </div>
        <button
          className="rounded-xl text-gray-500 font-semibold text-base py-2 px-3 mx-auto"
          onClick={() => onSwitchForm("forgot")}
        >
          Forgot Password?
        </button>
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 border-none rounded-xl text-base font-medium text-neutral-50 cursor-pointer mb-5 transition duration-300"
        >
          Sign In
        </button>
        {err && (
          <span className="text-red-500 text-sm">Something went wrong</span>
        )}
      </form>

      <p className="text-[#333] font-sans tracking-tight leading-6 mt-20 mb-10 text-center">
        Do not have an account yet?
      </p>
      <button
        onClick={() => onSwitchForm("signup")}
        className="w-full leading-6 px-5 py-3 items-center text-center justify-center inline-flex rounded-xl font-sans text-[#4d4d4d] font-semibold bg-[#f2f2f2]"
      >
        <img src={SignUpIcon} alt="Sign Up" className="mr-2 h-5 w-5" />
        Sign Up
      </button>
      <button
        onClick={handleGoogleSignIn}
        className="w-full leading-6 px-5 py-3 items-center text-center justify-center inline-flex rounded-xl font-sans text-[#4d4d4d] font-semibold bg-[#f2f2f2] mt-4"
      >
        <img src={GoogleIcon} alt="Google" className="mr-2 h-5 w-5" />
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
