import { useState, useContext, useCallback } from "react";
import { ChatContext } from "../contexts/ChatContext";

export const useSearchMessages = () => {
  const { data, dispatch } = useContext(ChatContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback(
    (query) => {
      setSearchQuery(query);
      setIsSearching(true);

      if (!query.trim()) {
        dispatch({ type: "SET_SEARCH_RESULTS", payload: [] });
        setSelectedIndex(-1);
        setIsSearching(false);
        return;
      }

      // Tìm kiếm trong messages hiện tại
      const results = data.messages
        .filter(
          (message) =>
            message.text?.toLowerCase().includes(query.toLowerCase()) ||
            message.translatedText?.toLowerCase().includes(query.toLowerCase())
        )
        .map((message) => ({
          ...message,
          matchIndex: message.text.toLowerCase().indexOf(query.toLowerCase()),
        }));

      dispatch({ type: "SET_SEARCH_RESULTS", payload: results });
      setSelectedIndex(results.length > 0 ? 0 : -1);
      setIsSearching(false);
    },
    [data.messages, dispatch]
  );

  const navigateResults = useCallback(
    (direction) => {
      if (data.searchResults.length === 0) return;

      setSelectedIndex((prevIndex) => {
        if (direction === "up") {
          return prevIndex > 0 ? prevIndex - 1 : data.searchResults.length - 1;
        } else {
          return prevIndex < data.searchResults.length - 1 ? prevIndex + 1 : 0;
        }
      });
    },
    [data.searchResults]
  );

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSelectedIndex(-1);
    dispatch({ type: "CLEAR_SEARCH_RESULTS" });
  }, [dispatch]);

  return {
    searchQuery,
    selectedIndex,
    isSearching,
    searchResults: data.searchResults,
    handleSearch,
    navigateResults,
    clearSearch,
  };
};
