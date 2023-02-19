import { useEffect, useState } from "react";

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

const Header = ({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [dark, setDark] = useState(false);

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
      <div className="flex gap-5 ">
        <p className="text-sm">BTC/EUR: 19,977.55</p>
        <p className="text-sm">BTC/USD: 22,112.01</p>
      </div>

      <div className="flex gap-x-10 gap-y-5 flex-col md:flex-row">
        <div className="flex gap-3 items-center">
          <span className="text-sm">Display Currency:</span>
          <button className="text-sm bg-slate-100 py-1 p-3 rounded hover:bg-slate-200 font-semibold dark:bg-slate-600">
            EUR
          </button>
          <button className="text-sm bg-slate-100 py-1 p-3 rounded hover:bg-slate-200 font-semibold dark:bg-slate-400">
            USD
          </button>
          <button className="text-sm bg-slate-300 py-1 p-3 rounded font-semibold dark:bg-slate-400">
            BTC
          </button>
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
