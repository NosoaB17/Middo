import { FaWindows } from "react-icons/fa";

const CallToAction = () => {
  return (
    <div
      className="bg-center bg-cover bg-no-repeat flex flex-col items-center justify-center py-12 px-5 leading-6"
      style={{
        backgroundImage: "url('https://middo.app/landing-page/hero.png')",
      }}
    >
      <h2 className="text-[32px] font-semibold text-blue-500 leading-[48px] mb-8">
        Ready to get started?
      </h2>
      <button className="inline-flex items-center  px-7 py-4 bg-blue-500 text-white rounded-lg font-medium transition-colors duration-300 hover:bg-blue-600">
        <FaWindows className="mr-2" />
        Download App
      </button>
    </div>
  );
};

export default CallToAction;
