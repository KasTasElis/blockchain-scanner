import { createContext, useContext, useState } from "react";
import {
  makeTheQuery,
  useSearchHistory,
  checkIfWalletOrTransaction,
  INPUT_TYPE,
} from "./index";
import { Data } from "../components/DataCard";

type TSearchContext = {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  loading: boolean;
  data: Data | null;
  triggerSearch: () => void;
  searchType: null | INPUT_TYPE;
  reset: () => void;
};

const initialState: TSearchContext = {
  setValue: () => undefined,
  value: "",
  loading: false,
  data: null,
  triggerSearch: () => undefined,
  searchType: null,
  reset: () => undefined,
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
    setData(null); // reseting
    const type = checkIfWalletOrTransaction(value);
    setSearchType(type);
    const response = await makeTheQuery(value);
    appendSearch(value);
    setData(response);
    setLoading(false);
  };

  const reset = () => {
    setData(null);
    setLoading(false);
    setValue("");
    setSearchType(null);
  };

  return (
    <SearchContext.Provider
      value={{
        setValue,
        loading,
        data,
        triggerSearch,
        value,
        searchType,
        reset,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

const useSearchContext = () => useContext(SearchContext);

export { useSearchContext, SearchContextProvider };
