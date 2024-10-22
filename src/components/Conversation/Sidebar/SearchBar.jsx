import { useState, useContext } from "react";
import { ChatContext } from "../../../contexts/ChatContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

import Search from "../../../assets/conversation/search2.svg";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { dispatch } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      const q = query(
        collection(db, "users"),
        where("displayName", ">=", searchTerm),
        where("displayName", "<=", searchTerm + "\uf8ff")
      );

      const querySnapshot = await getDocs(q);
      const users = querySnapshot.docs
        .map((doc) => ({
          uid: doc.id,
          ...doc.data(),
        }))
        .filter((user) => user.uid !== currentUser.uid);

      setSearchResults(users);
      dispatch({ type: "SET_SEARCH_RESULTS", payload: users });
      console.log("Search results:", users);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="mb-2">
        <div className="relative w-full overflow-hidden rounded-xl border bg-background transition-all">
          <div className="flex h-11 pl-1 transition-all">
            <input
              placeholder="Search users"
              className="w-full border-0 bg-inherit p-2 ring-0 focus:outline-none"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex h-11 w-11 items-center bg-inherit ">
              <button
                type="submit"
                className="flex aspect-square h-full items-center justify-center p-2 text-primary disabled:text-text"
                disabled={!searchTerm.trim()}
              >
                <img src={Search} alt="search-icon" style={{ fill: "#333" }} />
              </button>
            </div>
          </div>
        </div>
      </form>
      {searchResults.length > 0 && (
        <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg">
          {searchResults.map((user) => (
            <div
              key={user.uid}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(user)}
            >
              <div className="flex items-center">
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span>{user.displayName}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
