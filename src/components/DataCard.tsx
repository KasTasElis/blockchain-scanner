import { useSearchContext } from "../utils";

type Data = { [label: string]: string | boolean | number };

const DataCard = ({ title, data }: { title: string; data: Data }) => {
  const { reset } = useSearchContext();

  return (
    <div className="p-5 rounded mb-5 bg-slate-100 dark:bg-slate-800 dark:text-gray-200 relative">
      <div className="absolute top-3 right-3">
        <button
          onClick={reset}
          className="bg-slate-200 px-3 py-1 rounded hover:bg-slate-300 mr-3 dark:bg-slate-500 hover:dark:bg-slate-400 font-semibold text-sm"
        >
          🔔 Subscribe
        </button>
        <button
          onClick={reset}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-400 text-white"
        >
          ⨉
        </button>
      </div>

      <h3 className="font-semibold text-xl">{title}</h3>

      <div className="border-b my-5 border-slate-300"></div>

      <ul>
        {Object.entries(data).map(([key, value], index) => (
          <li key={index} className="flex justify-between mb-2">
            <strong>{key}: </strong>
            <span className="text-align-right">{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { DataCard };
