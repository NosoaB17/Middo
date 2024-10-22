import { useState, useEffect } from "react";
import MiddoIntroVideo from "../../assets/home/hero/MiddoIntroVideo.mp4";
import { FaWindows } from "react-icons/fa";

const Hero = () => {
  const [currentLanguage, setCurrentLanguage] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const languages = [
    {
      first: "To break all",
      second: "languages boundary",
      lang: "English",
    },
    {
      first: "Phá vỡ mọi",
      second: "rào cản ngôn ngữ",
      lang: "Vietnamese",
    },
    {
      first: "모두 깨뜨리려면",
      second: "언어 경계",
      lang: "Korean",
    },
    {
      first: "Pour briser toutes",
      second: "frontière des langues",
      lang: "French",
    },
    {
      first: "去打破一切",
      second: "语言边界",
      lang: "Chinese",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentLanguage((prev) => (prev + 1) % languages.length);
        setIsFading(false);
      }, 500); // Wait for FaceOut Complete
    }, 2000); // Transition every 2s

    return () => clearInterval(interval);
  }, [languages.length]);

  return (
    <div
      className=" w-full flex:col md:flex md:flex-row-reverse justify-between px-[93.6px] pb-12 pt-[108px] bg-[#FAFAFA] bg-center bg-contain bg-no-repeat  md:px=[5vw] "
      style={{
        backgroundImage: "url('https://middo.app/landing-page/hero.png')",
      }}
    >
      <div className="relative h-fit md:w-[48%] md:min-w-[48%]">
        <video
          src={MiddoIntroVideo}
          alt="Video call"
          muted
          controls
          playsInline
          className="mt-6 absolute inset-0 object-contain rounded-3xl"
        />
      </div>
      <div className="mt-8 flex flex-col justify-center items-center md:items-start md:mr-8">
        <h1 className="flex flex-col overflow-hidden mb-5">
          <span
            className={`text-[64px] font-bold leading-[96px] text-left transition-opacity duration-500 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          >
            {languages[currentLanguage].first}
          </span>
          <span
            className={`text-[64px] font-bold leading-[96px] text-left text-blue-500 transition-opacity duration-500 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          >
            {languages[currentLanguage].second}
          </span>
        </h1>
        <p className="text-base text-gray-600 mt-8 text-left">
          Middo can be your trusted tool to do all translation work. Beside that
          we also provide a barrier-free language conversation platform.
        </p>
        <button className="inline-flex items-center justify-center px-7 py-4 mt-[30px] bg-blue-500 text-white rounded-xl text-center font-semibold transition-colors duration-300 hover:bg-blue-600">
          <FaWindows className="mr-2" />
          Download App
        </button>
      </div>
    </div>
  );
};

export default Hero;
