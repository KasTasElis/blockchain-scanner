import { createContext, useContext, useState } from "react";
import {
  INPUT_TYPE,
  checkIfWalletOrTransaction,
  makeTheQuery,
  useSearchHistory,
} from "./index";

type TSearchContext = {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  loading: boolean;
  data: any;
  triggerSearch: () => void;
  searchType: null | INPUT_TYPE;
  reset: () => void;
  error: null | string;
};

const initialState: TSearchContext = {
  setValue: () => undefined,
  value: "",
  loading: false,
  data: null,
  triggerSearch: () => undefined,
  searchType: null,
  reset: () => undefined,
  error: null,
};

const SearchContext = createContext(initialState);

const SearchContextProvider = ({ children }: { children: JSX.Element }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState<null | string>(null);
  const [searchType, setSearchType] = useState<INPUT_TYPE | null>(null);

  const { appendSearch } = useSearchHistory();

  const triggerSearch = async () => {
    setLoading(true);
    setData(null); // reseting
    setError(null); // reseting
    const type = checkIfWalletOrTransaction(value);
    setSearchType(type);
    try {
      const response = await makeTheQuery(value);
      setData(response);
    } catch (error) {
      if (typeof error === "string") {
        setError(error);
      }

      setError("Blockchain API returned no data.");
    } finally {
      appendSearch(value);
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setLoading(false);
    setValue("");
    setSearchType(null);
    setError(null);
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
        error,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

const useSearchContext = () => useContext(SearchContext);

export { useSearchContext, SearchContextProvider };
