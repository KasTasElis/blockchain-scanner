import { useEffect, useState } from "react";
import { useRatesContext } from "../hooks";
import { Button } from "./";

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
          <Button
            colour={displayCurrency === CURRENCY.EUR ? "medium" : "light"}
            onClick={() => setDisplayCurrency(CURRENCY.EUR)}
          >
            {CURRENCY.EUR}
          </Button>
          <Button
            colour={displayCurrency === CURRENCY.USD ? "medium" : "light"}
            onClick={() => setDisplayCurrency(CURRENCY.USD)}
          >
            {CURRENCY.USD}
          </Button>
          <Button
            colour={displayCurrency === CURRENCY.BTC ? "medium" : "light"}
            onClick={() => setDisplayCurrency(CURRENCY.BTC)}
          >
            {CURRENCY.BTC}
          </Button>
        </div>

        <Button onClick={() => toggleDarkMode(setDark)}>
          {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </Button>

        <Button colour="primary" onClick={() => setShowModal(true)}>
          🔔 Subsribed (2)
        </Button>
      </div>
    </div>
  );
};

export { Header };
