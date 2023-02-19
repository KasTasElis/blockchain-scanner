import { useSearchHistory } from "../utils";

const SearchBox = () => {
  const { appendSearch } = useSearchHistory();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputElement = document.querySelector(
      "#searchInput"
    ) as HTMLInputElement | null;
    if (!inputElement) {
      throw Error("Wtf is going on, there is no search input element...?");
    }

    appendSearch(inputElement.value);
  };

  return (
    <div className="py-5 rounded">
      <form onSubmit={onSubmit} className="flex space-x-4">
        <input
          id="searchInput"
          type="text"
          placeholder="TX Hash / Wallet Address"
          className="bg-slate-100 p-3 rounded w-full focus-visible:outline-amber-500 text-md"
          required
        />
        <button className="px-5 py-3 bg-amber-500 rounded hover:bg-amber-400 font-semibold text-md md:text-2xl">
          🔍
        </button>
      </form>
    </div>
  );
};

export { SearchBox };
