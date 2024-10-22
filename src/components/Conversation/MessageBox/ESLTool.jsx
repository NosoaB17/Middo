import { Edit2 } from "lucide-react";

const ESLTool = ({ isOpen, onToggle, translatedText, onEdit }) => {
  return (
    <div
      className={`bg-[#f8fafc] rounded-xl gap-3 p-3 mb-2 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="flex justify-between items-center p-1 mb-2">
        <div className="flex items-center ">
          <img
            src="https://hatscripts.github.io/circle-flags/flags/gb.svg"
            alt="UK Flag"
            className="w-5 h-5 mr-2"
          />
          <span className="font-semibold text-[#666]">
            E.S.L Translation Tool
          </span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isOpen}
            onChange={onToggle}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer  after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      <div className="flex justify-between">
        <div className="mt-2 p-2 rounded">
          <p className="text-base">{translatedText}</p>
        </div>
        <button
          onClick={onEdit}
          className="w-9 h-9 rounded-full p-2 hover:bg-gray-100"
        >
          <Edit2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default ESLTool;
