import { Button } from "..";
import { useSearchContext } from "../../hooks";

const SearchForm = () => {
  const { triggerSearch, setValue, loading, value } = useSearchContext();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    triggerSearch();
  };

  const handlePaste = async () => {
    const pasteResult = await navigator.clipboard.readText();
    setValue(pasteResult);
  };

  return (
    <form onSubmit={onSubmit} className="flex space-x-4">
      <div className="w-full relative">
        <input
          id="searchInput"
          type="text"
          placeholder="TX Hash / Wallet Address"
          className="bg-slate-100 p-3 rounded w-full focus-visible:outline-amber-500 text-md h-full dark:bg-slate-400 dark:text-white dark:placeholder:text-slate-500"
          required
          pattern="\b((bc1|[13])[a-zA-HJ-NP-Z0-9]{26,90}|[0-9A-Fa-f]{64})\b" // this does... :D
          //pattern={WALLET_OR_TX_HASH_REGEX} // this does not work.. no idea why
          title="Please enter a valid BTC wallet address or a TX hash"
          onChange={onChange}
          value={value}
        />

        <div className="absolute right-0 top-0 h-full flex justify-center items-center bg-slate-100 rounded dark:bg-slate-400">
          <Button type="button" colour="clear" onClick={handlePaste}>
            <span className="text-slate-500">PASTE</span>
          </Button>
        </div>
      </div>

      <Button size="large" colour="primary" type="submit" disabled={loading}>
        {loading ? "⏳" : "🔍"}
      </Button>
    </form>
  );
};

export { SearchForm };
