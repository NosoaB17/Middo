import historyLogo from "../../assets/products/history2.svg";
import clearLogo from "../../assets/products/clear.svg";
import copyAllLogo from "../../assets/products/copy-all.svg";
import deleteLogo from "../../assets/products/delete.svg";

const getCountryCode = (lang) => {
  const countryMap = {
    en: "gb",
    ko: "kr",
    vi: "vn",
    // Add more mappings as needed
  };
  return countryMap[lang] || lang;
};

const HistoryModal = ({
  isOpen,
  onClose,
  history,
  onDeleteTranslation,
  onClearHistory,
}) => {
  const handleCopyTranslation = (item) => {
    const textToCopy = `${item.sourceText}\n${item.targetText}\n${item.eslSource}`;
    navigator.clipboard.writeText(textToCopy);
    alert("Translation copied to clipboard!");
  };

  const handleDelete = (id) => {
    onDeleteTranslation(id);
  };

  return (
    <div
      className={`fixed top-0 right-0 w-1/4 h-screen bg-white shadow-lg transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center mt-12 p-4 border-b border-gray-200">
        <img src={historyLogo} alt="History" className="w-5 h-5 mr-2" />
        <span className="text-lg font-bold text-blue-500">History</span>
        <button
          className="ml-auto text-2xl text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ×
        </button>
      </div>
      <div className="flex justify-end p-2 border-b border-gray-200">
        <button
          onClick={onClearHistory}
          className="flex items-center bg-gray-100 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-200 transition-colors"
        >
          <img src={clearLogo} alt="Clear" className="w-4 h-4 mr-2" />
          <span>Clear all</span>
        </button>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-120px)] p-4">
        {history.map((item) => (
          <div key={item.id} className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center mb-2">
              <img
                src={`https://hatscripts.github.io/circle-flags/flags/${getCountryCode(
                  item.sourceLanguage
                )}.svg`}
                alt={item.sourceLanguage}
                className="w-5 h-5 mr-2"
              />
              <span className="text-sm text-gray-600">
                {item.sourceLanguage}
              </span>
            </div>
            <div className="text-base mb-2">{item.sourceText}</div>
            <div className="flex items-center mb-2">
              <img
                src={`https://hatscripts.github.io/circle-flags/flags/${getCountryCode(
                  item.targetLanguage
                )}.svg`}
                alt={item.targetLanguage}
                className="w-5 h-5 mr-2"
              />
              <span className="text-sm text-gray-600">
                {item.targetLanguage}
              </span>
            </div>
            <div className="text-base mb-2">{item.targetText}</div>
            <div className="flex justify-end">
              <button
                className={`bg-blue-100 rounded-full p-2 mr-2 ${
                  item.isEslMatched
                    ? "hover:bg-blue-200"
                    : "opacity-50 cursor-not-allowed"
                }`}
                onClick={() => handleCopyTranslation(item)}
                disabled={!item.isEslMatched}
              >
                <img src={copyAllLogo} alt="Copy" className="w-4 h-4" />
              </button>
              <button
                className="bg-red-100 rounded-full p-2 hover:bg-red-200"
                onClick={() => handleDelete(item.id)}
              >
                <img src={deleteLogo} alt="Delete" className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryModal;
