import { useState } from "react";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";
import ForgotPass from "../components/Auth/ForgotPass";
import worldMapImage from "../assets/auth/content-background.png";
import backgroundImage from "../assets/auth/background.png";

const Auth = () => {
  const [currentForm, setCurrentForm] = useState("signin");

  const handleSwitchForm = (form) => {
    setCurrentForm(form);
  };

  const getFormClass = (formName) => {
    const baseClass =
      "absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out";
    if (formName === currentForm) {
      return `${baseClass} opacity-100 translate-x-0`;
    }
    if (
      (formName === "signup" && currentForm === "signin") ||
      (formName === "forgot" && currentForm === "signup") ||
      (formName === "signin" && currentForm === "forgot")
    ) {
      return `${baseClass} opacity-0 translate-x-full`;
    }
    return `${baseClass} opacity-0 -translate-x-full`;
  };

  return (
    <div className="mx-auto">
      <div className="flex h-screen">
        <div
          className="flex-1 bg-cover bg-center flex items-center justify-center relative"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <img
            src={worldMapImage}
            alt="World Map"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[90%] max-h-[90%] object-contain"
          />
        </div>
        <div className="flex-none w-[22.5%] flex items-center justify-center p-8 bg-white relative overflow-hidden">
          <div className={getFormClass("signin")}>
            <SignIn onSwitchForm={handleSwitchForm} />
          </div>
          <div className={getFormClass("signup")}>
            <SignUp onSwitchForm={handleSwitchForm} />
          </div>
          <div className={getFormClass("forgot")}>
            <ForgotPass onSwitchForm={handleSwitchForm} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
