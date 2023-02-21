import { useState } from "react";
import { useSearchHistory } from "../utils";
import { DataCard } from "../components";

type TWalletInfo = {
  Address: string;
  "Total Received": number;
  "Total Sent": number;
  "Final Balance": number;
  "No. of Transactions": number;
};

const SearchBox = () => {
  const { appendSearch } = useSearchHistory();
  const [walletInfo, setWalletInfo] = useState<TWalletInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const onChange = (e: any) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const URL = "https://blockchain.info/rawaddr";
    const QueryURL = `${URL}/${value}`;
    const res = await fetch(QueryURL);
    console.log({ res });
    const data = await res.json();
    console.log({ data });

    // to historical search record
    appendSearch(value);

    // data.XYZ could be any data.. how would i annotate it here?
    const newWalletInfo = {
      Address: data.address,
      "Total Received": data.total_received,
      "Total Sent": data.total_sent,
      "Final Balance": data.final_balance,
      "No. of Transactions": data.n_tx,
    };

    setWalletInfo(newWalletInfo);
  };

  const handlePaste = async () => {
    const pasteResult = await navigator.clipboard.readText();
    setValue(pasteResult);
  };

  // useEffect(() => {
  //   // show custom html5 validation message
  //   const inputEl = document.querySelector(
  //     "#searchInput"
  //   ) as HTMLInputElement | null;
  //   if (!inputEl) return;

  //   inputEl.setCustomValidity(
  //     "Please enter a valid BTC wallet address or transaction hash."
  //   );
  // }, []);

  return (
    <div className="py-5 rounded">
      <form onSubmit={onSubmit} className="flex space-x-4">
        <div className="w-full relative">
          <input
            id="searchInput"
            type="text"
            placeholder="TX Hash / Wallet Address"
            className="bg-slate-100 p-3 rounded w-full focus-visible:outline-amber-500 text-md h-full"
            required
            //pattern="/^([13]{1}[a-km-zA-HJ-NP-Z1-9]{26,33}|bc1[a-z0-9]{39,62})$"
            maxLength={90}
            minLength={11}
            onChange={onChange}
            value={value}
          />
          <div className="absolute right-0 top-0 h-full pr-5 flex justify-center items-center">
            <button
              type="button"
              className="text-sm cursor-pointer text-gray-500 hover:opacity-70"
              onClick={handlePaste}
            >
              PASTE
            </button>
          </div>
        </div>
        <button className="px-5 py-3 bg-amber-500 rounded hover:bg-amber-400 font-semibold text-md md:text-2xl">
          🔍
        </button>
      </form>

      {loading ? (
        <h3 className="text-center text-lg font-semibold p-5">Loading...</h3>
      ) : !walletInfo ? (
        <h3 className="text-center text-lg font-semibold p-5">
          Nothing to show...
        </h3>
      ) : (
        <div className="mt-5">
          <DataCard
            title="💰 Wallet Address"
            subTitle={walletInfo.Address}
            data={{ ...walletInfo }}
          />
        </div>
      )}
    </div>
  );
};

export { SearchBox };
