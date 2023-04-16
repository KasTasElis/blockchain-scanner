import classNames from "classnames";
import { useEffect, useState } from "react";
import { useRatesContext } from "../utils";

import { CURRENCY } from "../consts";

function toggleDarkMode(
  setDarkState: React.Dispatch<React.SetStateAction<boolean>>
) {
  const html = document.querySelector("html");
  if (!html) return;

  if (html.classList.contains("dark")) {
    setDarkState(false);
    html.classList.remove("dark");
    return;
  }

  html.classList.add("dark");
  setDarkState(true);
}

const pretty = (amount: number, currency: "EUR" | "USD") => {
  const figure = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
  });
  return figure.format(amount);
};

const Button = ({ currency }: { currency: CURRENCY }) => {
  const { displayCurrency, setDisplayCurrency } = useRatesContext();

  const isActive = displayCurrency === currency;

  return (
    <button
      onClick={() => setDisplayCurrency(currency)}
      className={classNames(
        "text-sm bg-slate-100 py-1 p-3 rounded hover:bg-slate-200 font-semibold dark:bg-slate-400 dark:hover:bg-slate-500",
        { "bg-slate-300 dark:bg-slate-500": isActive }
      )}
    >
      {currency}
    </button>
  );
};

const Header = ({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [dark, setDark] = useState(false);
  const { rates, setDisplayCurrency, displayCurrency } = useRatesContext();

  useEffect(() => {
    // initialise dark state
    const html = document.querySelector("html");
    if (!html) return;

    if (html.classList.contains("darl")) {
      setDark(true);
    }
  }, []);

  return (
    <div className="flex justify-between p-3 items-center flex-col gap-y-3 flex-wrap dark:text-gray-200">
      <div className="flex gap-5">
        <p className="text-sm">
          BTC/EUR: {rates.EUR ? pretty(rates.EUR, "EUR") : "Loading..."}
        </p>
        <p className="text-sm">
          BTC/USD: {rates.USD ? pretty(rates.USD, "USD") : "Loading..."}
        </p>
      </div>

      <div className="flex gap-x-10 gap-y-5 flex-col md:flex-row">
        <div className="flex gap-3 items-center">
          <span className="text-sm">Display Currency:</span>
          {/* <button
            onClick={() => setDisplayCurrency(CURRENCY.EUR)}
            className="text-sm bg-slate-100 py-1 p-3 rounded hover:bg-slate-200 font-semibold dark:bg-slate-600"
          >
            EUR
          </button>
          <button
            onClick={() => setDisplayCurrency(CURRENCY.USD)}
            className="text-sm bg-slate-100 py-1 p-3 rounded hover:bg-slate-200 font-semibold dark:bg-slate-400"
          >
            USD
          </button>
          <button
            onClick={() => setDisplayCurrency(CURRENCY.BTC)}
            className="text-sm bg-slate-300 py-1 p-3 rounded font-semibold dark:bg-slate-400"
          >
            BTC
          </button> */}
          <Button currency={CURRENCY.EUR} />
          <Button currency={CURRENCY.USD} />
          <Button currency={CURRENCY.BTC} />
        </div>

        <button
          onClick={() => toggleDarkMode(setDark)}
          className="text-sm bg-slate-100 py-1 p-3 rounded hover:bg-slate-200 font-semibold dark:bg-slate-400"
        >
          {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        <button
          onClick={() => setShowModal(true)}
          className="text-sm bg-amber-500 py-1 p-3 rounded hover:bg-amber-400 font-semibold text-amber-900"
        >
          🔔 Subsribed (2)
        </button>
      </div>
    </div>
  );
};

export { Header };
