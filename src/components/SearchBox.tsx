import { createContext, useContext, useRef, useState } from "react";
import { useSearchContext, useSearchHistory } from "../utils";
import { DataCard } from "../components";

type TWalletInfo = {
  Address: string;
  "Total Received": number;
  "Total Sent": number;
  "Final Balance": number;
  "No. of Transactions": number;
};

// BTC wallet address
// - min 26 chars
// - max 90 chars
// - do not include the letters I, O, and Q because they can be easily mistaken for the numbers 1 and 0
// - include the numbers 1-9 and the letters A-H, J-N, P, and R-Z.

// btc wallet address length is meh...

// const WALLET_REGEX = "\b(bc1|[13])[a-zA-HJ-NP-Z0-9]{26,90}\b";
// const TX_HASH_REGEX = "\b[0-9A-Fa-f]{64}\b";
// const WALLET_OR_TX_HASH_REGEX =
//   "\b((bc1|[13])[a-zA-HJ-NP-Z0-9]{26,90}|[0-9A-Fa-f]{64})\b";

enum INPUT_TYPE {
  BTC_WALLET = "BTC_WALLET",
  BTC_TX_HASH = "BTC_TX_HASH",
  NEITHER = "NEITHER",
}

function isBitcoinTransactionHash(str: string) {
  const regex = /\b[0-9A-Fa-f]{64}\b/;
  return regex.test(str);
}

function isBitcoinWalletAddress(str: string) {
  const regex = /\b(bc1|[13])[a-zA-HJ-NP-Z0-9]{26,90}\b/;
  return regex.test(str);
}

function checkValidity(str: string) {
  if (isBitcoinWalletAddress(str)) {
    return INPUT_TYPE.BTC_WALLET;
  }

  if (isBitcoinTransactionHash(str)) {
    return INPUT_TYPE.BTC_TX_HASH;
  }

  return INPUT_TYPE.NEITHER;
}

const SearchBox = () => {
  //const { appendSearch } = useSearchHistory();
  //const [walletInfo, setWalletInfo] = useState<TWalletInfo | null>(null);
  //const [loading, setLoading] = useState(false);
  //const [value, setValue] = useState("");
  //const [inputType, setInputType] = useState(null);
  const { triggerSearch, setValue, loading, data, value, searchType } =
    useSearchContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(e.target.value);
    setValue(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    triggerSearch();

    // const result = checkValidity(value);

    // if (result === INPUT_TYPE.BTC_WALLET) {
    //   alert("Its a BTC Wallet");
    //   return;
    // } else if (result === INPUT_TYPE.BTC_TX_HASH) {
    //   alert("Its a BTC TX Hash");
    // } else {
    //   alert("Could be neither...");
    // }

    // const URL = "https://blockchain.info/rawaddr";
    // const QueryURL = `${URL}/${value}`;
    // const res = await fetch(QueryURL);
    // console.log({ res });
    // const data = await res.json();
    // console.log({ data });

    // to historical search record
    //appendSearch(value);

    // data.XYZ could be any data.. how would i annotate it here?
    // const newWalletInfo = {
    //   Address: data.address,
    //   "Total Received": data.total_received,
    //   "Total Sent": data.total_sent,
    //   "Final Balance": data.final_balance,
    //   "No. of Transactions": data.n_tx,
    // };

    // setWalletInfo(newWalletInfo);
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
            pattern="\b((bc1|[13])[a-zA-HJ-NP-Z0-9]{26,90}|[0-9A-Fa-f]{64})\b" // this does... :D
            //pattern={WALLET_OR_TX_HASH_REGEX} // this does not work.. no idea why
            title="Please enter a valid BTC wallet address or a TX hash"
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
        <h1>"Loading..."</h1>
      ) : data ? (
        <div className="mt-5">
          <DataCard
            title="💰 Wallet Address"
            subTitle={walletInfo.Address}
            data={{ ...walletInfo }}
          />
        </div>
      ) : (
        <h1>Nothing to show yet.</h1>
      )}

      {/* {loading ? (
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
      )} */}
    </div>
  );
};

export { SearchBox };
