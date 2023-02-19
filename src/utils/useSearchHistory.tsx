import {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";

type TSearch = { query: string; queriedAt: number; count: number };
type TSearchHistoryContext = {
  searches: TSearch[];
  appendSearch: (query: string) => void;
};

const SearchHistoryContext = createContext<TSearchHistoryContext>({
  searches: [],
  appendSearch: () => undefined,
});

const useSearchHistory = () => useContext(SearchHistoryContext);

const SearchHistoryProvider = ({ children }: { children: ReactNode }) => {
  const [searches, setSearches] = useState<TSearch[]>([]);
  const STORAGE_NAME = "BLOCKCHAIN_SEARCH_HISTORY";

  useEffect(() => {
    // initialize
    const data = window.localStorage.getItem(STORAGE_NAME);

    if (!searches.length && data) {
      setSearches(() => JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    // persist search data
    if (!searches.length) {
      return;
    }
    window.localStorage.setItem(STORAGE_NAME, JSON.stringify(searches));
  }, [searches]);

  const appendSearch = (query: string) => {
    // check if it already exists
    const index = searches.findIndex((search) => search.query === query);

    // item exists, append
    if (index !== -1) {
      setSearches((prevSearches) =>
        prevSearches.map((search, i) =>
          i === index
            ? { ...search, count: search.count + 1, queriedAt: Date.now() }
            : search
        )
      );
      return;
    }

    // need to create a new one
    const newItem: TSearch = { queriedAt: Date.now(), count: 1, query };
    //setSearches([...searches, newItem]);
    setSearches((prevSearches) => [...prevSearches, newItem]);
  };

  return (
    <SearchHistoryContext.Provider value={{ searches, appendSearch }}>
      {children}
    </SearchHistoryContext.Provider>
  );
};

function getMostRecentSearches(searches: TSearch[], limit = 5): string[] {
  const sortedSearches = searches.sort(
    (a, b) => Number(b.queriedAt) - Number(a.queriedAt)
  );
  return sortedSearches.slice(0, limit).map((item) => item.query);
}

function getTopSearches(searches: TSearch[], limit = 5): string[] {
  const sortedSearches = searches.sort((a, b) => b.count - a.count);
  return sortedSearches.slice(0, limit).map((item) => item.query);
}

export {
  getTopSearches,
  getMostRecentSearches,
  SearchHistoryProvider,
  useSearchHistory,
};
