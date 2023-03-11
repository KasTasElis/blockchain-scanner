import { useSearchContext, INPUT_TYPE } from "../utils";
import { DataCard } from "./DataCard";

const TX_MOCK_DATA = {
  hash: "7ba41ae94987f042e46bdc33d4631e5159edad2f52b5bb372c0ee3aaeab491ea",
  ver: 2,
  vin_sz: 1,
  vout_sz: 2,
  size: 404,
  weight: 854,
  fee: 22042,
  relayed_by: "0.0.0.0",
  lock_time: 0,
  tx_index: 8253168845937761,
  double_spend: false,
  time: 1677136860,
  block_index: 777918,
  block_height: 777918,
  inputs: [
    {
      sequence: 4294967294,
      witness:
        "04004730440220695cb40ab1c805fe0eb52d59dd87559bf0583949d82dae80b8a95da0422b92fe02207117af5810652de1a3cbf2a717bd7b37662fe1555d1ff6b28414a90b098ce47c01473044022078963242fc7f7d953edfb7d1d6aac121b958324c61769aaca0f16c72237172d502204797559e2e6ddb338e52e8dc956f67b4aa7d3788840c6c46ca9ddbe025b2b71e01695221038670f281511910c8f1766760e3443bb9ee3c8ef7d8747723e44469dd1578bffe210206e557618c5df9fb20a3f580632ee11b05d724bd99f6e01df92b5ccc3c2eaa332102f1db4fd7e30f0cf640df8efc312385498241d9562242b7030401c5923948218253ae",
      script:
        "2200206572d22a14725b0d5d38a2c39bdf0cd54eccb6a82888e2dff26d6ad3e44d5d5d",
      index: 0,
      prev_out: {
        addr: "3DGxAYYUA61WrrdbBac8Ra9eA9peAQwTJF",
        n: 1,
        script: "a9147f1463882fd439c069afdb5a5af6085f53718f8387",
        spending_outpoints: [{ n: 0, tx_index: 8253168845937761 }],
        spent: true,
        tx_index: 1919045332409314,
        type: 0,
        value: 1549988950,
      },
    },
  ],
  out: [
    {
      type: 0,
      spent: true,
      value: 142896908,
      spending_outpoints: [{ tx_index: 3243806820697934, n: 0 }],
      n: 0,
      tx_index: 8253168845937761,
      script: "a9147f1463882fd439c069afdb5a5af6085f53718f8387",
      addr: "3DGxAYYUA61WrrdbBac8Ra9eA9peAQwTJF",
    },
    {
      type: 0,
      spent: true,
      value: 1407070000,
      spending_outpoints: [{ tx_index: 616662389985920, n: 8 }],
      n: 1,
      tx_index: 8253168845937761,
      script: "a914c1768b8771c5e74cf8a47a3241dbe570d72d5c7687",
      addr: "3KKxMDjyPFw4aSz1D6oXZaV3M23DbPmKBB",
    },
  ],
};

const SearchBox = () => {
  const { triggerSearch, setValue, loading, data, value, searchType } =
    useSearchContext();

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

          <div className="absolute right-0 top-0 h-full flex justify-center items-center bg-slate-100 rounded">
            <button
              type="button"
              className="text-sm cursor-pointer text-gray-500 p-3 hover:text-gray-600"
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

      <div className="mt-5">
        {loading ? <h1>Loading...</h1> : null}
        {data ? (
          <DataCard
            title={
              searchType === INPUT_TYPE.BTC_TX_HASH ? "Transaction" : "Wallet"
            }
            subTitle={
              searchType === INPUT_TYPE.BTC_TX_HASH
                ? (data!.hash as string)
                : "No subtitle"
            }
            data={TX_MOCK_DATA}
          />
        ) : null}
      </div>
    </div>
  );
};

export { SearchBox };
