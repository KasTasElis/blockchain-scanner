import { createContext, useContext, useState } from "react";
import {
  makeTheQuery,
  useSearchHistory,
  checkIfWalletOrTransaction,
  INPUT_TYPE,
} from "./index";

type TSearchContext = {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  loading: boolean;
  data: [] | null;
  triggerSearch: () => void;
  searchType: null | INPUT_TYPE;
};

const initialState: TSearchContext = {
  setValue: () => undefined,
  value: "",
  loading: false,
  data: null,
  triggerSearch: () => undefined,
  searchType: null,
};

const SearchContext = createContext(initialState);

const SearchContextProvider = ({ children }: { children: JSX.Element }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [searchType, setSearchType] = useState<INPUT_TYPE | null>(null);

  const { appendSearch } = useSearchHistory();

  const triggerSearch = async () => {
    setLoading(true);
    const type = checkIfWalletOrTransaction(value);
    setSearchType(type);
    const response = await makeTheQuery(value);
    appendSearch(value);
    setData(response);
    setLoading(false);
  };

  return (
    <SearchContext.Provider
      value={{ setValue, loading, data, triggerSearch, value, searchType }}
    >
      {children}
    </SearchContext.Provider>
  );
};

const useSearchContext = () => useContext(SearchContext);

export { useSearchContext, SearchContextProvider };
