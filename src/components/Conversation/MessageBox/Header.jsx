import { useContext } from "react";
import { ChatContext } from "../../../contexts/ChatContext";

const Header = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="flex items-center justify-between p-3 border-b">
      <div className="flex items-center">
        <img
          src={data.user?.photoURL}
          alt={data.user?.displayName}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h2 className="font-semibold">{data.user?.displayName}</h2>
          <p className="text-sm text-gray-500">{data.user?.status}</p>
        </div>
      </div>
      <div className="flex items-center">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <span className="material-icons">search</span>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <span className="material-icons">more_vert</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
