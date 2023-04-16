import { Button } from ".";
import { useRatesContext, useSearchContext } from "../hooks";
import { INPUT_TYPE, formatTimestamp } from "../utils";
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

const WALLET_MOCK_DATA = {
  hash160: "660d4ef3a743e3e696ad990364e555c271ad504b",
  address: "1AJbsFZ64EpEfS5UAjAfcUG8pH8Jn3rn1F",
  n_tx: 82,
  n_unredeemed: 1,
  total_received: 15443919556,
  total_sent: 15441506556,
  final_balance: 2413000,
  txs: [],
};

type TWalletData = {
  hash160: string;
  address: string;
  n_tx: number;
  total_received: number;
  total_sent: number;
  final_balance: number;
};

const preProcessWalletData = (walletJsondata: TWalletData, transform: any) => {
  const { hash160, address, n_tx, total_received, total_sent, final_balance } =
    walletJsondata;

  return {
    "Wallet Hash": hash160,
    "Wallet Address": address,
    "Number of Transactions": n_tx,
    "Total Received": transform(total_received),
    "Total Sent": transform(total_sent),
    "Wallet Balance": transform(final_balance),
  };
};

const preProcessTransactionData = (
  transactionJsondata: any,
  transform: any
) => {
  const { hash, fee, time, out } = transactionJsondata;

  const outAddrs = out.reduce((acc: any, curr: any, index: number) => {
    acc[`Out BTC Address ${index + 1}`] = curr.addr;
    return acc;
  }, {});

  return {
    "TX Hash": hash,
    "TX Fee": transform(fee),
    "Total TX Value": transform(
      out.reduce((acc: number, curr: { value: number }) => acc + curr.value, 0)
    ),
    "Created At": formatTimestamp(time),
    ...outAddrs,
  };
};

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full p-7 gap-2">
      <div className="animate-spin text-[50px]">⌛️</div>
      <div className="font-semibold text-slate-400">Loading...</div>
    </div>
  );
};

const NoResults = ({ error }: { error: string }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full p-7 gap-2">
      <div className="text-[50px]">🤷‍♂️</div>
      <div className="font-semibold text-slate-400">{error}</div>
    </div>
  );
};

const Placeholder = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full p-7 gap-2">
      <div className="text-[50px]">🤗</div>
      <div className="font-semibold text-slate-400 text-center">
        Enter BTC wallet address
        <br />
        or transaction hash to start.
      </div>
    </div>
  );
};

const SearchBox = () => {
  const { triggerSearch, setValue, loading, data, value, searchType, error } =
    useSearchContext();
  const { displayMonetaryValue } = useRatesContext();

  const WALLET_MOCK_DATA_PRETTY = preProcessWalletData(
    WALLET_MOCK_DATA,
    displayMonetaryValue
  );

  const TX_MOCK_DATA_PRETTY = preProcessTransactionData(
    TX_MOCK_DATA,
    displayMonetaryValue
  );

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

  const myProcessedData = () => {
    if (searchType === INPUT_TYPE.BTC_WALLET) {
      return preProcessWalletData(data, displayMonetaryValue);
    }

    if (searchType === INPUT_TYPE.BTC_TX_HASH) {
      return preProcessTransactionData(data, displayMonetaryValue);
    }

    return data;
  };

  return (
    <div className="py-5 rounded">
      <form onSubmit={onSubmit} className="flex space-x-4 mb-7">
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
            <Button type="button" colour="clear" onClick={handlePaste}>
              <span className="text-slate-500">PASTE</span>
            </Button>
          </div>
        </div>
        <Button size="large" colour="primary" type="submit" disabled={loading}>
          {loading ? "⏳" : "🔍"}
        </Button>
      </form>

      {!loading && !data && !error ? <Placeholder /> : null}

      {loading ? <Loading /> : null}

      {error ? <NoResults error={error} /> : null}

      {data ? (
        <DataCard
          title={
            searchType === INPUT_TYPE.BTC_TX_HASH
              ? "🔀 Transaction"
              : "💰 BTC Wallet"
          }
          data={myProcessedData()}
        />
      ) : null}
    </div>
  );
};

export { SearchBox };
