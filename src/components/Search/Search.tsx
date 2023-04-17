import { useRatesContext, useSearchContext } from "../../hooks";
import { INPUT_TYPE } from "../../utils";
import { DataCard, Loading, NoResults, Placeholder, SearchForm } from "./";
import { preProcessTransactionData, preProcessWalletData } from "./utils";

const Search = () => {
  const { loading, data, searchType, error } = useSearchContext();
  const { displayMonetaryValue } = useRatesContext();

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
    <div className="py-5">
      <div className="mb-7">
        <SearchForm />
      </div>

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

export { Search };
