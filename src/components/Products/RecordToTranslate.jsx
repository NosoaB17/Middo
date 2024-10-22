import micLogo from "../../assets/products/mic.svg";

const RecordToTranslate = () => {
  return (
    <div className="flex items-center justify-center bg-[#f2f2f2] text-[#020817] gap-3 p-3 leading-6 rounded-full shadow-[0_10px_24px_0_rgba(23, 23, 23, 0.1)] relative ">
      <button
        className={`flex items-center justify-center focus-outline-none bg-blue-200 md:hover:bg-blue-300 md:hover:bg-primary-300 rounded-full z-10 p-0 shrink-0 w-[60px] h-[60px]
        }`}
      >
        <img src={micLogo} alt="Record" className="w-6 h-6" />
      </button>
    </div>
  );
};

export default RecordToTranslate;
