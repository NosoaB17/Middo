import { useState, useContext } from "react";
import { ChatContext } from "../../../contexts/ChatContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { dispatch } = useContext(ChatContext);

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
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch({ type: "SET_SEARCH_RESULTS", payload: users });
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSearch} className="w-full">
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
                className="flex aspect-square h-full items-center justify-center p-2 text-primary disabled:text-text "
                disabled={!searchTerm.trim()}
              >
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>
          </div>
        </div>
      </form>
      <button
        type="button"
        className="inline-flex items-center justify-center focus:outline-nonetransition-all  font-medium bg-neutral-50 text-neutral-700 md:hover:bg-neutral-100 active:!bg-neutral-200   rounded-full p-0 shrink-0 md:w-9 md:h-9 w-11 h-11"
      >
        <span className="material-symbols-outlined">filter_list</span>
      </button>
    </>
  );
};

export default SearchBar;
