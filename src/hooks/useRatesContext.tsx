import { createContext, useContext, useEffect, useState } from "react";

import { CURRENCY } from "../consts";

const RatesContext = createContext<{
  displayCurrency: CURRENCY;
  setDisplayCurrency: React.Dispatch<React.SetStateAction<CURRENCY>>;
  rates: { EUR: null | number; USD: null | number };
  displayMonetaryValue: (amount: number) => string;
}>({
  rates: { EUR: null, USD: null },
  displayCurrency: CURRENCY.BTC,
  setDisplayCurrency: () => undefined,
  displayMonetaryValue: () => "",
});

function formatSatoshisToBTC(satoshis: number) {
  const btc = satoshis / 100000000;
  return btc.toFixed(8);
}

const RatesContextProvider = ({ children }: { children: JSX.Element }) => {
  const [rates, setRates] = useState({ EUR: null, USD: null });
  const [displayCurrency, setDisplayCurrency] = useState(CURRENCY.BTC);

  useEffect(() => {
    const URI = "https://blockchain.info/ticker";

    const intLength = 30000;
    const fetchData = () => {
      fetch(URI)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRates({ EUR: data["EUR"]["last"], USD: data["USD"]["last"] });
        })
        .catch((err) => {
          console.error(err);
        });
    };
    fetchData();
    const fetcherInterval = setInterval(fetchData, intLength);

    return () => clearInterval(fetcherInterval);
  }, []);

  const displayMonetaryValue = (amount: number) => {
    const btcAmount = formatSatoshisToBTC(amount);

    if (displayCurrency === CURRENCY.BTC) {
      return `₿${btcAmount}`;
    }

    if (displayCurrency === CURRENCY.EUR) {
      if (!rates.EUR) return "€...";

      const figure = Number(btcAmount) * rates.EUR;
      const formated = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: CURRENCY.EUR,
        currencyDisplay: "symbol",
      });

      return formated.format(figure);
    }

    if (displayCurrency === CURRENCY.USD) {
      if (!rates.USD) return "$...";

      const figure = Number(btcAmount) * rates.USD;
      const formated = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: CURRENCY.USD,
        currencyDisplay: "symbol",
      });

      return formated.format(figure);
    }

    return "?...";
  };

  return (
    <RatesContext.Provider
      value={{
        rates,
        displayCurrency,
        setDisplayCurrency,
        displayMonetaryValue,
      }}
    >
      {children}
    </RatesContext.Provider>
  );
};

const useRatesContext = () => useContext(RatesContext);

export { RatesContextProvider, useRatesContext };
